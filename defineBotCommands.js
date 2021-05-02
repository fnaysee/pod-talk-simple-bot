let chatClient = require('./chatClient')({
});

chatClient.on("chatReady", function () {
    let params = {
        botName: 'questions1BOT',
        commandList: ['start', 'next', 'prev']
    };

    chatClient.defineBotCommand(params, result => {
        console.log(result)
    })
});

chatClient.on('error' , errors => {
    console.log('Errors', errors);
})
