import chatClient from "./chatClient.js"
let chatAgent = chatClient({
    token: '0bea561f71af4cc9829afce8ac472f2d' //This is bot token
});

chatAgent.on("chatState", function (event) {
    console.log("chatState", event);
});

chatAgent.on("chatReady", function () {
    console.log("chatReady");
});

chatAgent.on('error', errors => {
    console.log('Errors: ', errors)
});


chatAgent.on('threadEvents', function (event) {
    console.log('threadEvents', event);
});
chatAgent.on('systemEvents', function (event) {
    console.log('systemEvents', event);
});

chatAgent.on('messageEvents', function (event) {
    console.log('messageEvents', event);
});

