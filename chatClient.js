import Chat from "podchat"
//apiToken: "b0b934f5518947d6ad06120ecd5e490a.XzIwMjMy" fntest2BOT
const defaults = {
    appId: new Date().getTime(),
    grantDeviceIdFromSSO: false,
    enableCache: false, // Enable Client side caching
    mapApiKey: "API_KEY_OF_NESHAN_MAP", //  {**REQUIRED**} API Key of Neshan Map

    socketAddress: 'wss://msg.pod.ir/ws', // {**REQUIRED**} Socket Address
    ssoHost: 'https://accounts.pod.ir', // {**REQUIRED**} Socket Address
    platformHost: 'https://api.pod.ir/srv/core', // {**REQUIRED**} Platform Core Address
    fileServer: 'https://core.pod.ir', // {**REQUIRED**} File Server Address
    podSpaceFileServer: 'https://podspace.pod.ir',
    serverName: "chat-server", // {**REQUIRED**} Server to to register on

    // socketAddress: "ws://172.16.110.235:8003/ws",
    // ssoHost: "http://172.16.110.76",
    // platformHost: "http://172.16.110.235:8003/srv/bptest-core",
    // fileServer: 'https://core.pod.ir',
    // podSpaceFileServer: 'http://sandbox.podspace.ir:8080',//'http://172.16.110.61:8780/podspace',
    // serverName: "chatlocal",


    token: "0bea561f71af4cc9829afce8ac472f2f", // {**REQUIRED**} SSO Token
    wsConnectionWaitTime: 500, // Time out to wait for socket to get ready after open
    connectionRetryInterval: 5000, // Time interval to retry registering device or registering server
    connectionCheckTimeout: 10000, // Socket connection live time on server
    messageTtl: 24 * 60 * 60, // Message time to live (1 day in seonds)
    reconnectOnClose: true, // auto connect to socket after socket close
    asyncLogging: {
        onFunction: false, // log main actions on console
        onMessageReceive: false, // log received messages on console
        onMessageSend: false, // log sent messaged on console
        actualTiming: true // log actual functions running time
    },
    // protocol: "webrtc",
    // webrtcConfig: {
    //     baseUrl: "https://async-chat.fanapsoft.ir/webrtc/",//"https://172.16.110.26/webrtc/",//"http://localhost:3000/webrtc/",//"http://109.201.0.97/webrtc/",//"https://172.16.110.26:443/webrtc/",
    //     configuration: {
    //         bundlePolicy: "balanced",
    //         iceTransportPolicy: "relay",
    //         iceServers: [{
    //             "urls": "turn:turnsandbox.podstream.ir:3478", "username": "mkhorrami", "credential": "mkh_123456"
    //         }]
    //     }
    // },

    //             protocol: "queue",
    //             queueHost: "192.168.112.23",
    //             queuePort: "61613",
    //             queueUsername: "root",
    //             queuePassword: "j]Bm0RU8gLhbPUG",


    // protocol: "queue",
    // queueReceive: "queue-in-fntest",
    // queueSend: "queue-out-fntest",
    // queueConnectionTimeout: 20000,

    // queueServers: [
    //     /**
    //      * Sandbox active servers
    //      */
    //     {
    //         protocol: "queue",
    //         serverHost: "10.56.12.25",
    //         serverPort: "61613",
    //         serverUsername: "root",
    //         serverPassword: "royLhAvLRdG1lObqPcprODFwm",
    //     },
    //     // {
    //     //     protocol: "queue",
    //     //     serverHost: "10.56.12.55",
    //     //     serverPort: "61616",
    //     //     serverUsername: "root",
    //     //     serverPassword: "j]Bm0RU8gLhbPUG",
    //     // },
    // ]

};
let chatAgent;
function chatClient(params) {
    if(params) {
        return new Chat({...defaults,...params})

    } else {
        if(chatAgent)
            return chatAgent;
        else {
            chatAgent = new Chat({...defaults,...params});
            return chatAgent;
        }
    }
}
export default chatClient;
