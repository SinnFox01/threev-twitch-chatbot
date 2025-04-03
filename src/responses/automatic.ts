import { sendChatMessage, sendShoutOut } from "../requests";

export async function handleRaids(raiderUserName: any) {
    await sendChatMessage(`!so ${raiderUserName}`);
    await sendShoutOut(raiderUserName);
}
