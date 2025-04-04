import { USER_ID, OAUTH_TOKEN, CLIENT_ID } from "./constants";
import { Condition } from "./types";

export async function getAuth() {
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

export async function registerEventSubListeners(
    websocketSessionID: any,
    type: string,
    version: string,
    condition: Condition,
) {
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
                    condition: condition,
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

export async function sendShoutOut(to: string) {
    let response = await fetch("https://api.twitch.tv/helix/chat/shoutouts", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + OAUTH_TOKEN,
            "Client-Id": CLIENT_ID,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from_broadcaster_id: USER_ID,
            to_broadcaster_id: to,
            moderator_id: USER_ID,
        }),
    });

    if (response.status != 204) {
        let data = await response.json();
        console.error("Failed to send chat message");
        console.error(data);
    } else {
        console.log("Shouted out " + to);
    }
}

export async function sendChatMessage(chatMessage: string) {
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

export async function banUser(user_id: string) {
    let response = await fetch("https://api.twitch.tv/helix/moderation/bans", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + OAUTH_TOKEN,
            "Client-Id": CLIENT_ID,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            broadcaster_id: USER_ID,
            moderator_id: USER_ID,
            user_id,
        }),
    });

    if (response.status != 200) {
        let data = await response.json();
        console.error("Failed to send chat message");
        console.error(data);
    }
}
