import { banUser, sendChatMessage, sendShoutOut } from "../requests";
import {
    STREAMER_USERNAME,
    STREAMER_NAME,
    BANNABLE_SENTENCES,
} from "../constants";

export async function handleRaids(raiderUserName: any) {
    await sendChatMessage(`!so ${raiderUserName}`);
    await sendShoutOut(raiderUserName);
}

export async function handleDadJokes(user_messager: string, message: string) {
    if (user_messager.toLowerCase() !== STREAMER_USERNAME) {
        // Capital letters
        let capitalIAmArray = ["I am", "Im", "I'm"];
        for (let iAm of capitalIAmArray) {
            if (message.includes(iAm)) {
                let index = message.indexOf(iAm);
                let reply = message.substring(
                    index + iAm.length,
                    message.length,
                );
                await sendChatMessage(`Hi ${reply}. I'm ${STREAMER_NAME}.`);
            }
        }

        // Non Capital letters
        let iAmArray = ["i am", "im", "i'm"];
        for (let iAm of iAmArray) {
            if (message.includes(iAm)) {
                let index = message.indexOf(iAm);
                if (index === 0 || message[index - 1] === " ") {
                    let reply = message.substring(
                        index + iAm.length,
                        message.length,
                    );
                    await sendChatMessage(`Hi ${reply}. I'm ${STREAMER_NAME}.`);
                }
            }
        }
    }
}

export async function handleAutoBans(
    user_messager: string,
    user_id: string,
    message: string,
) {
    for (const bannableSentence of BANNABLE_SENTENCES) {
        if (message.includes(bannableSentence)) {
            banUser(user_id);
            sendChatMessage(`${user_messager} has been banned!`);
        }
    }
}
