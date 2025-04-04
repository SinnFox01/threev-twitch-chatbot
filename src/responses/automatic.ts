import { banUser, sendChatMessage, sendShoutOut } from "../requests";

export async function handleRaids(raiderUserName: any) {
    await sendChatMessage(`!so ${raiderUserName}`);
    await sendShoutOut(raiderUserName);
}

export async function handleDadJokes(user_messager: string, message: string) {
    if (user_messager.toLowerCase() !== "threevprime") {
        if (message.includes("I am")) {
            let index = message.indexOf("I am");
            let reply = message.substring(index + 4, message.length);
            await sendChatMessage(`Hi ${reply}. I'm Threev.`);
        }
        if (message.includes("Im")) {
            let index = message.indexOf("Im");
            let reply = message.substring(index + 2, message.length);
            await sendChatMessage(`Hi ${reply}. I'm Threev.`);
        }
        if (message.includes("I'm")) {
            let index = message.indexOf("I'm");
            let reply = message.substring(index + 3, message.length);
            await sendChatMessage(`Hi ${reply}. I'm Threev.`);
        }
    }
}

export async function handleAutoBans(
    user_messager: string,
    user_id: string,
    message: string,
) {
    if (
        message.toLowerCase() ===
        "I followed on tiwtter follow back and stuff sadflkjasdlkfjksdalfjkasldjfksadjkfsdafhksladfj"
    ) {
        banUser(user_id);
        sendChatMessage(`${user_messager} has been banned!`);
    }
}
