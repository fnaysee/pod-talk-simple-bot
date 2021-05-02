let chatClient = require('./chatClient')({
    token: "92a6b9143cef45f0b4cb69d8b3d7bcd3" //Admin token
});

chatClient.on("chatReady", function () {
    chatClient.startBot({
        threadId: 473534,
        botName: 'questions1BOT'
    });
});
