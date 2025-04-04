import { sendChatMessage } from "../requests";

export async function handleRedeems(
    redeem: string,
    user: string,
    user_id: string,
) {
    switch (redeem) {
        case "first":
            await firstOnStream(user, user_id);
            break;
        case "second":
            await secondOnStream(user, user_id);
            break;
        case "third":
            await thirdOnStream(user, user_id);
            break;
        case "daily":
            await dailyRedeem(user, user_id);
            break;
        default:
            await sendChatMessage(`${redeem} has been redeemed by ${user}!`);
            break;
    }
}

async function firstOnStream(user: string, user_id: string) {
    await sendChatMessage(
        `${user} is the first person to join the stream for the n-th time!`,
    );
    console.log(user_id);
}

async function secondOnStream(user: string, user_id: string) {
    await sendChatMessage(
        `${user} is the second person to join the stream for the n-th time!`,
    );
    console.log(user_id);
}

async function thirdOnStream(user: string, user_id: string) {
    await sendChatMessage(
        `${user} is the third person to join the stream for the n-th time!`,
    );
    console.log(user_id);
}

async function dailyRedeem(user: string, user_id: string) {
    await sendChatMessage(`${user} has joined the stream for the n-th time!`);
    console.log(user_id);
}
