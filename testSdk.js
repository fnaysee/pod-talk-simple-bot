import chatClient from "./chatClient.js"
import Blob from "cross-blob"
import * as fs from "fs";
let chatAgent = chatClient({
    token: "3bc8629849f24e54a955ec6a302b7d98.XzIwMjM2"//'e345276676a3404f8534500aebd26376.XzIwMjM0' //bot token //091da37d6c964bcc94bc823853028e86.XzIwMjIxMg //b0b934f5518947d6ad06120ecd5e490a.XzIwMjMy //a19ab6251b174702b904deae848f9c4f.XzIwMjMz
});

let runtest = false;
chatAgent.on("chatState", function (event) {
    console.log("chatState", event);

    if(event.socketState == 1 && !runtest) {
        runtest = true;
        reconnectSocketForTest(4);

        setTimeout(()=>{
            reconnectSocketForTest(4);
        }, 15000)
    }
    // setInterval(function (){
    //     chatAgent.getThreads({}, function (result){console.log("getThreads.result: hasError?", result.hasError)})
    // }, 1000)
});

function reconnectSocketForTest(count){
    setTimeout(()=>{
        chatAgent.reconnect();
        if(count) {
            reconnectSocketForTest(count - 1)
        }
    }, 200);
}

chatAgent.on("chatReady", function () {
    console.log("chatReady");
    console.log("current user:", chatAgent.getCurrentUser());

    // chatAgent.addParticipants({
    //     threadId: 1358227,
    //     usernames: ["questions1BOT"]
    // }, result => {
    //     console.log("addParticipants:", result);
    // });

    // chatAgent.getHistory({
    //     threadId: 1358227,
    //     count: 2,
    //     offset: 0
    // },
    //     (result) => {
    //     console.log("chatAgent.getHistory::", result, result.result.history);
    //
    //     let imageInfo = JSON.parse(result.result.history[0].metadata);
    //
    //     chatAgent.sendTextMessage({
    //         textMessage: 'salam',
    //         threadId: 1358227
    //     }, (result)=>{
    //         console.log(result)
    //     })
    //
    //     // chatAgent.getFileFromPodspace({
    //     //     hashCode: imageInfo.file.hashCode,
    //     //     quality: 1,
    //     //     size: 3
    //     // }, result => {
    //     //
    //     //
    //     //     //console.log(result.result.result.responseText)
    //     //     saveFile(imageInfo.file.originalName, result.result.result.responseText, imageInfo.file.mimeType);
    //     // })
    // })

    // chatAgent.exportChat({threadId: 58920, exportPath: "./"}, result => {
    //     console.log(result);
    // })
});

chatAgent.on('error', errors => {
    console.error('Errors: ', errors)
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

async function saveFile(fileName, data, mimeType) {

    const blob = new Blob([data], {
        type: mimeType
    })


    const buffer = Buffer.from( await blob.arrayBuffer() );

    fs.writeFile(fileName, buffer, () => console.log('video saved!') );

}