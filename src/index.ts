import "dotenv/config";
import WebSocket from "ws";

const USER_ID = "453815125";
const OAUTH_TOKEN: string = process.env.ACCESS_TOKEN || "";
const CLIENT_ID: string = process.env.CLIENT_ID || "";

const EVENTSUB_WEBSOCKET_URL = "wss://eventsub.wss.twitch.tv/ws";

let websocketSessionID: any;

(async () => {
    await getAuth();

    startWebSocketClient();
})();

async function getAuth() {
    let response = await fetch("https://id.twitch.tv/oauth2/validate", {
        method: "GET",
        headers: {
            Authorization: "OAuth " + OAUTH_TOKEN,
        },
    });

    if (response.status != 200) {
        let data = await response.json();
        console.error(
            "Token is not valid. /oauth2/validate returned status code " +
                response.status,
        );
        console.error(data);
        process.exit(1);
    }

    console.log("Validated token.");
}

function startWebSocketClient() {
    let webSocketClient = new WebSocket(EVENTSUB_WEBSOCKET_URL);

    webSocketClient.on("error", console.error);

    webSocketClient.on("on", () => {
        console.log("WebSocket connection opened to " + EVENTSUB_WEBSOCKET_URL);
    });

    webSocketClient.on("message", (data) => {
        handleWebSocketMessage(JSON.parse(data.toString()));
    });

    return webSocketClient;
}

async function handleWebSocketMessage(data: any) {
    switch (data.metadata.message_type) {
        case "session_welcome":
            websocketSessionID = data.payload.session.id;

            await registerEventSubListeners("channel.chat.message", "1");
            await registerEventSubListeners(
                "channel.channel_points_custom_reward_redemption.add",
                "1",
            );
            break;
        case "notification":
            switch (data.metadata.subscription_type) {
                case "channel.chat.message":
                    console.log(
                        `MSG #${data.payload.event.broadcaster_user_login} <${data.payload.event.chatter_user_login}> ${data.payload.event.message.text}`,
                    );

                    let message = data.payload.event.message.text.trim();

                    switch (message.toLowerCase()) {
                        case "bug":
                            sendChatMessage("threev6Smokinghead");
                            break;
                    }
                    break;
                case "channel.channel_points_custom_reward_redemption.add":
                    let redeem = data.payload.event.reward.title.trim();
                    let user = data.payload.event.user_login.trim();

                    console.log(
                        `MSG #${data.payload.event.broadcaster_user_login} <${user}> ${redeem}`,
                    );

                    sendChatMessage("threev6Smokinghead");
                    sendChatMessage(`${redeem} has been redeemed by ${user}!`);
                    break;
            }
            break;
    }
}

async function sendChatMessage(chatMessage: string) {
    let response = await fetch("https://api.twitch.tv/helix/chat/messages", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + OAUTH_TOKEN,
            "Client-Id": CLIENT_ID,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            broadcaster_id: USER_ID,
            sender_id: USER_ID,
            message: chatMessage,
        }),
    });

    if (response.status != 200) {
        let data = await response.json();
        console.error("Failed to send chat message");
        console.error(data);
    } else {
        console.log("Sent chat message: " + chatMessage);
    }
}

async function registerEventSubListeners(type: string, version: string) {
    try {
        let response = await fetch(
            "https://api.twitch.tv/helix/eventsub/subscriptions",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + OAUTH_TOKEN,
                    "Client-Id": CLIENT_ID,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: type,
                    version: version,
                    condition: {
                        broadcaster_user_id: USER_ID,
                        user_id: USER_ID,
                    },
                    transport: {
                        method: "websocket",
                        session_id: websocketSessionID,
                    },
                }),
            },
        );

        if (response.status != 202) {
            let data = await response.json();
            console.error(
                "Failed to subscribe to channel.chat.message. API call returned status code " +
                    response.status,
            );
            console.error(data);
            process.exit(1);
        } else {
            const data = await response.json();
            console.log(
                `Subscribed to channel.chat.message [${data.data[0].id}]`,
            );
        }
    } catch (error) {
        console.error(error);
    }
}
