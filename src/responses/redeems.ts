import { sendChatMessage } from "../requests";

export async function handleRedeems(
    redeem: string,
    user: string,
    user_id: string,
    boradcaster_user_login: string,
) {
    console.log(`MSG #${boradcaster_user_login} <${user}> ${redeem}`);
    console.log(user_id);
    await sendChatMessage("threev6Smokinghead");
    await sendChatMessage(`${redeem} has been redeemed by ${user}!`);
}
