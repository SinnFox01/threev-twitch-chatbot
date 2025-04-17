// The username that appears in your URL
export const STREAMER_USERNAME: string =
    process.env.STREAMER_USERNAME || "threevprime";
// The name you want to be called normally
export const STREAMER_NAME: string = process.env.STREAMER_NAME || "Threev";
export const USER_ID: string = process.env.USER_ID || "";
export const OAUTH_TOKEN: string = process.env.ACCESS_TOKEN || "";
export const CLIENT_ID: string = process.env.CLIENT_ID || "";
export const DATABASE_FILEPATH: string = process.env.DATABASE_FILEPATH || "";
export const EVENTSUB_WEBSOCKET_URL = "wss://eventsub.wss.twitch.tv/ws";
export const BANNABLE_SENTENCES = [
    "streamboo .com",
    "streamboo . com",
    "I followed on twitter follow back",
];
