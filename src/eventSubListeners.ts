import { registerEventSubListeners } from "./requests";
import { USER_ID } from "./constants";

export async function handleRegisteringEventSubListeners(
    websocketSessionID: any,
) {
    await registerEventSubListeners(
        websocketSessionID,
        "channel.chat.message",
        "1",
        {
            broadcaster_user_id: USER_ID,
            user_id: USER_ID,
        },
    );
    await registerEventSubListeners(
        websocketSessionID,
        "channel.channel_points_custom_reward_redemption.add",
        "1",
        {
            broadcaster_user_id: USER_ID,
            user_id: USER_ID,
        },
    );
    await registerEventSubListeners(websocketSessionID, "channel.raid", "1", {
        to_broadcaster_user_id: USER_ID,
    });
    await registerEventSubListeners(websocketSessionID, "channel.raid", "1", {
        from_broadcaster_user_id: USER_ID,
    });
}
