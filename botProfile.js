let chatClient = require('./chatClient')({
    token: "0bea561f71af4cc9829afce8ac472f2d" //This is bots token
});

const threads = [];
const questions = [
    {
        id: 1,
        question: '1. سوال شماره 1 ؟(جواب درست 3 است)',
        answers: [
            '1. جواب اول',
            '2. جواب دوم',
            '3. جواب سوم',
            '4. جواب چهارم'
        ],
        correctAnswer: 3
    },
    {
        id: 2,
        question: '2. سوال شماره 2 ؟(جواب درست 2 است)',
        answers: [
            '1. جواب اول',
            '2. جواب دوم',
            '3. جواب سوم',
            '4. جواب چهارم'
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        question: '3. سوال شماره 3 ؟(جواب درست 2 است)',
        answers: [
            '1. جواب اول',
            '2. جواب دوم',
            '3. جواب سوم',
            '4. جواب چهارم'
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        question: '4. سوال شماره 4 ؟(جواب درست 4 است)',
        answers: [
            '1. جواب اول',
            '2. جواب دوم',
            '3. جواب سوم',
            '4. جواب چهارم'
        ],
        correctAnswer: 4
    },

]


chatClient.on("chatReady", function () {

});

chatClient.on('error', errors => {
    console.log('Errors: ', errors)
});


chatClient.on('messageEvents', function (event) {
    if(event.type === 'MESSAGE_NEW' && event.result.message.messageType === 1) {
        let msg = event.result.message;
        if(msg.message === '/start@questions1BOT') {
            openThreadWithUser(msg);
        }
        else if(/^[1-9]$/.test(msg.message.trim()) && getCurrentUser(msg) && isGameStarted(msg)) {
            let currentUser = getCurrentUser(msg);
            let currentQuestion = currentUser.answers.filter(item => item.q == currentUser.currentQuestion);
            if(!currentUser.isGameDone) {
                if(!currentQuestion.length){
                    currentUser.answers.push({
                        q: currentUser.currentQuestion,
                        answer: msg.message.trim(),
                        isCorrect: questions[currentUser.currentQuestion].correctAnswer == msg.message.trim()
                    });
                } else {
                    currentQuestion[0].answer = msg.message.trim();
                    currentQuestion[0].isCorrect = questions[currentUser.currentQuestion].correctAnswer == msg.message.trim()
                }

                updateUser(currentUser);
                sendNextQuestion(msg, currentUser)
            } else {
                printGameIsDone(currentUser);
            }

        } else {
            let currentUser = getCurrentUser(msg);
            switch (msg.message.trim()) {
                case '/شروع':
                    startQuestionAnswerProcess(msg, currentUser);
                    break;
                case '/بعدی':
                    if(!currentUser.isGameDone && currentUser.isGameStarted)
                        sendNextQuestion(msg, currentUser);
                     else if(currentUser.isGameDone)
                        printGameIsDone(currentUser)
                    break;
                case '/قبلی':
                    if(!currentUser.isGameDone && currentUser.isGameStarted)
                        sendPrevQuestion(msg, currentUser);
                     else if(currentUser.isGameDone)
                        printGameIsDone(currentUser)
            }
        }
    }
});

function printGameIsDone(currentUser){
    chatClient.sendTextMessage({
        threadId: currentUser.thread,
        textMessage: `بازی تمام شده!
` + printResult(currentUser) + ` 
برای شروع مجدد /شروع را ارسال کنید
`
    });
}

function getCurrentUser(msg) {
    let currentUser = threads.filter(item => item.thread === msg.threadId)
    if(currentUser && currentUser.length) {
        return currentUser[0]
    }

    return false
}

function updateUser(newData) {
    threads.map((item, index) => {
        console.log('updated the user.', 'item: ', item, 'newData: ', newData)
        if(item.thread === newData.thread) {
            threads[index] = newData;
        }
    });
}

function isGameStarted(msg) {
    let user = getCurrentUser(msg);
    if(!user)
        return false
    else
        return !!user.isGameStarted
}

function openThreadWithUser(msg) {
    chatClient.createThread({
        "invitees": [
            {"id": msg.ownerId, "idType": "TO_BE_USER_ID"}
        ],
        message: {
            uniqueId: "9766b140-24a9-49fb-a02e-6aff70we5a6",
            text: `سلام. به ربات پرسش و پاسخ خوش آمدید.
برای شرکت در رقابت باید به ${questions.length} سوال پاسخ بدید. 

لیست دستورات من به این صورته:
/شروع
/بعدی
/قبلی

فرمت صحیح جواب دادن هم به این صورته:
 فقط شماره سوال رو بفرستید، بدون هیچ متن اضافه ای، مثلا: 1، 3 و غیره...
 اگر فرمت جواب دادنت درست باشه خودم میرم سراغ سوال بعدی، در غیر اینصورت هیچی نمیگم و منتظر پیام بعدیت میمونم.
            `,
            metadata: {},
            systemMetadata: {},
            type: 1
        }
    }, function (ctr){//createThreadResult
        if(ctr && ctr.result && ctr.result.thread  && !threads.filter(item => item.thread === ctr.result.thread.id).length) {
            saveUser(ctr.result.thread.id, msg.ownerId);
        }
    })
}

function saveUser(threadId, userId) {
    threads.push({
        thread: threadId,
        user: userId,
        isGameStarted: false,
        isGameDone: false,
        currentQuestion: 0,
        answers: [
            /*{
                q: 4,
                answer: 2,
                isCorrect: false
            }*/
        ]
    })
}

function startQuestionAnswerProcess(msg, currentUser) {
    if(!currentUser) {
        saveUser(msg.threadId, msg.ownerId);
        currentUser = getCurrentUser(msg);
    }

    if(!currentUser.isGameDone) {
        chatClient.sendTextMessage({
            threadId: msg.threadId,
            textMessage: 'خوب مسابقه شروع شد،' + '\n'
                + 'سوال اول:' + '\n'
                + questions[0].question + '\n'
                + questions[0].answers.join('\n'),

        });
    } else {
        chatClient.sendTextMessage({
            threadId: msg.threadId,
            textMessage: 'خوب مسابقه از اول شروع شد و امتیاز شما ریست شد،' + '\n'
                + 'سوال اول:' + '\n'
                + questions[0].question + '\n'
                + questions[0].answers.join('\n'),
        });

        currentUser.answers = [];
    }


    //&& !getCurrentUser(msg).isGameDone

    currentUser.isGameStarted = true;
    currentUser.isGameDone = false;
    updateUser(currentUser);
    /*currentUser.progressState = {
        currentQuestion: 0,
        answers: [
            {
                q: 4,
                answer: 2,
                isCorrect: false
            }
        ]
    }*/
}
function sendNextQuestion(msg, currentUser) {
    if(!currentUser) {
        saveUser(msg.threadId, msg.ownerId);
        currentUser = getCurrentUser(msg);
    }
    currentUser.currentQuestion = currentUser.currentQuestion < questions.length - 1 ? currentUser.currentQuestion + 1 : 0;

    if(!currentUser.currentQuestion) {
        finishTheGame(currentUser)
    } else {
        chatClient.sendTextMessage({
            threadId: msg.threadId,
            textMessage: questions[currentUser.currentQuestion].question + '\n'
                + questions[currentUser.currentQuestion].answers.join('\n'),

        });

        updateUser(currentUser)
    }

    /*currentUser.progressState = {
        currentQuestion: 0,
        answers: [
            {
                q: 4,
                answer: 2,
                isCorrect: false
            }
        ]
    }*/
}
function sendPrevQuestion(msg, currentUser) {
    if(!currentUser) {
        saveUser(msg.threadId, msg.ownerId);
        currentUser = getCurrentUser(msg);
    }
    currentUser.currentQuestion = currentUser.currentQuestion > 0 ? currentUser.currentQuestion - 1 : 0;
    chatClient.sendTextMessage({
        threadId: msg.threadId,
        textMessage: questions[currentUser.currentQuestion].question + '\n'
            + questions[currentUser.currentQuestion].answers.join('\n'),

    });

    updateUser(currentUser)


    /*currentUser.progressState = {
        currentQuestion: 0,
        answers: [
            {
                q: 4,
                answer: 2,
                isCorrect: false
            }
        ]
    }*/
}

function finishTheGame(currentUser) {
    currentUser.isGameDone = true;
    chatClient.sendTextMessage({
        threadId: currentUser.thread,
        textMessage: `
        👏 تمام! این هم از نتیجه عملکرد شما:
` + printResult(currentUser)
        + ` 
برای شروع مجدد /شروع را ارسال کنید
        `
    });

    updateUser(currentUser)
}

function printResult(user) {
    let result = '';
    let correctCount = 0;
    user.answers.map(item => {
        result += `سوال ${item.q + 1} پاسخ شما: ${item.answer} ${(item.isCorrect ? '✅' : '❎')}
`;
        if(item.isCorrect)
            correctCount++;
    });

    result += `امتیاز نهایی شما: ${correctCount} از ${questions.length}`;

    return result
}
