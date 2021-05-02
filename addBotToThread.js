let chatClient = require('./chatClient')({
    token: "edac66a3c7644264926f47581a13506e" //Admin token
});

chatClient.on("chatReady", function () {
    chatClient.addParticipants({
        threadId: 473534,
        usernames: ['questions1BOT']
    });
});
