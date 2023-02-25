import Chat from "podchat"

const defaults = {
    appId: new Date().getTime(),
    grantDeviceIdFromSSO: false,
    enableCache: true, // Enable Client side caching
    mapApiKey: "API_KEY_OF_NESHAN_MAP", //  {**REQUIRED**} API Key of Neshan Map
    socketAddress: 'wss://msg.pod.ir/ws', // {**REQUIRED**} Socket Address
    ssoHost: 'https://accounts.pod.ir', // {**REQUIRED**} Socket Address
    platformHost: 'https://api.pod.ir/srv/core', // {**REQUIRED**} Platform Core Address
    fileServer: 'https://core.pod.ir', // {**REQUIRED**} File Server Address
    podSpaceFileServer: 'https://podspace.pod.ir',
    serverName: "chat-server", // {**REQUIRED**} Server to to register on
    token: "8536b93f439d499490bf77102adb1f07", // {**REQUIRED**} SSO Token
    wsConnectionWaitTime: 500, // Time out to wait for socket to get ready after open
    connectionRetryInterval: 5000, // Time interval to retry registering device or registering server
    connectionCheckTimeout: 10000, // Socket connection live time on server
    messageTtl: 24 * 60 * 60, // Message time to live (1 day in seonds)
    reconnectOnClose: true, // auto connect to socket after socket close
    asyncLogging: {
        onFunction: true, // log main actions on console
        onMessageReceive: true, // log received messages on console
        onMessageSend: true, // log sent messaged on console
        actualTiming: true // log actual functions running time
    }
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
