let chatClient = require('./chatClient')({

});

chatClient.on("chatReady", function () {

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

    chatClient.startBot({
        botName: 'questions1BOT',
        threadId: 473534
    }, result => {
        console.log(result)
    });
});

chatClient.on("chatState", function (chatState) {
    console.log('state <',chatState, '> end');
});
chatClient.on('error', errors => {
    console.log('Errors: ', errors)
});
