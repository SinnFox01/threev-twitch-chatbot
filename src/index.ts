import "dotenv/config";
import WebSocket from "ws";
import { EVENTSUB_WEBSOCKET_URL } from "./constants";
import { getAuth } from "./requests";
import { shippingUsers, simpleResponseCommands } from "./responses/commands";
import { handleRedeems } from "./responses/redeems";
import { handleRaids } from "./responses/automatic";
import { handleRegisteringEventSubListeners } from "./eventSubListeners";

(async () => {
    await getAuth();

    startWebSocketClient();
})();

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
    const event = data.payload.event;
    switch (data.metadata.message_type) {
        case "session_welcome":
            let websocketSessionID = data.payload.session.id;

            await handleRegisteringEventSubListeners(websocketSessionID);
            break;
        case "notification":
            switch (data.metadata.subscription_type) {
                case "channel.chat.message":
                    let user_messager = event.chatter_user_login.trim();
                    let message = event.message.text.trim();

                    await shippingUsers(user_messager, message);
                    await simpleResponseCommands(user_messager, message);
                    break;
                case "channel.channel_points_custom_reward_redemption.add":
                    let redeem = event.reward.title.trim();
                    let user = event.user_login.trim();
                    let user_id = event.user_id.trim();
                    let boradcaster_user_login =
                        event.broadcaster_user_login.trim();

                    await handleRedeems(
                        redeem,
                        user,
                        user_id,
                        boradcaster_user_login,
                    );
                    break;
                case "channel.raid":
                    const raiderUserName = event.from_broadcaster_user_name;

                    handleRaids(raiderUserName);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}
