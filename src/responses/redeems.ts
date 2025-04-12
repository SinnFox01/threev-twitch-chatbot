import { createUser, getUser, updateUser } from "../handleUserData";
import { sendChatMessage } from "../requests";

export async function handleRedeems(
    redeem: string,
    user: string,
    user_id: string,
) {
    switch (redeem) {
        case "first":
            console.log(redeem);
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

async function firstOnStream(user_name: string, user_id: string) {
    let times = 1;
    await getUser(user_id)
        .then((user) => {
            console.log(user);
            times = user.first + 1;
            updateUser({
                user_id,
                first: times,
                second: user.second,
                third: user.third,
                daily: user.daily,
            });
        })
        .catch(() => {
            createUser({
                user_id,
                first: times,
                second: 0,
                third: 0,
                daily: 0,
            });
        });
    await sendChatMessage(
        `${user_name} is the first person to join the stream for the ${timesRedeemed(times)} time!`,
    );
    console.log(user_id);
}

async function secondOnStream(user_name: string, user_id: string) {
    let times = 1;
    await getUser(user_id)
        .then((user) => {
            times = user.second + 1;
            updateUser({
                user_id,
                first: user.first,
                second: times,
                third: user.third,
                daily: user.daily,
            });
        })
        .catch(() => {
            createUser({
                user_id,
                first: 0,
                second: times,
                third: 0,
                daily: 0,
            });
        });
    await sendChatMessage(
        `${user_name} is the second person to join the stream for the ${timesRedeemed(times)} time!`,
    );
    console.log(user_id);
}

async function thirdOnStream(user_name: string, user_id: string) {
    let times = 1;
    await getUser(user_id)
        .then((user) => {
            times = user.third + 1;
            updateUser({
                user_id,
                first: user.first,
                second: user.second,
                third: times,
                daily: user.daily,
            });
        })
        .catch(() => {
            createUser({
                user_id,
                first: 0,
                second: 0,
                third: times,
                daily: 0,
            });
        });
    await sendChatMessage(
        `${user_name} is the third person to join the stream for the ${timesRedeemed(times)} time!`,
    );
    console.log(user_id);
}

async function dailyRedeem(user_name: string, user_id: string) {
    let times = 1;
    await getUser(user_id)
        .then((user) => {
            times = user.daily + 1;
            updateUser({
                user_id,
                first: user.first,
                second: user.second,
                third: user.third,
                daily: times,
            });
        })
        .catch(() => {
            createUser({
                user_id,
                first: 0,
                second: 0,
                third: 0,
                daily: times,
            });
        });
    await sendChatMessage(
        `${user_name} has joined the stream for the ${times} time!`,
    );
    console.log(user_id);
}

function timesRedeemed(times: number) {
    switch (times) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        default:
            return `${times}th`;
    }
}
