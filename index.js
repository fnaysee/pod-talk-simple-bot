
import chatClient from "./chatClient"
let chatAgent = new chatClient({
    token: '0bea561f71af4cc9829afce8ac472f2d'
});

chatAgent.on("chatReady", function () {

    /*let params = {
        threadId: 192209,
        textMessage: 'message',
        messageType: 'TEXT',
    };

    chatAgent.sendTextMessage(params, {
        onSent: function (result) {
            console.log(result.uniqueId + ' \t has been Sent!');
        },
        onDeliver: function (result) {
            console.log(result.uniqueId + ' \t has been Delivered!');
        },
        onSeen: function (result) {
            console.log(result.uniqueId + ' \t has been Seen!');
        }
    });*/

    chatAgent.startBot({
        botName: 'questions1BOT',
        threadId: 473534
    }, result => {
        console.log(result)
    });
});

chatAgent.on("chatState", function (chatState) {
    console.log('state <',chatState, '> end');
});
chatAgent.on('error', errors => {
    console.log('Errors: ', errors)
});
