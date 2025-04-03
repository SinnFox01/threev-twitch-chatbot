import { sendChatMessage } from "../requests";
import { randomPercantage } from "../utils";

export async function simpleResponseCommands(
    user_messager: string,
    message: string,
) {
    switch (message.toLowerCase()) {
        case "bug":
            await sendChatMessage("threev6Smokinghead");
            break;
        case "!help":
            await sendChatMessage(
                "!github - Gives github URL, !ship - Shows the compatability of 2 users, !sussy - Shows how sussy a person is, !rickrolled - yes",
            );
            break;
        case "!github":
            await sendChatMessage("https://github.com/threevprime");
            break;
        case "!rickrolled":
            await sendChatMessage(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            );
            break;
        case "!sussy":
            let sus_percantage = randomPercantage();
            await sendChatMessage(
                `@${user_messager} is ${sus_percantage}% sussy!`,
            );
            break;
        case "!raid":
            await sendRaidMessages();
            break;
        default:
            break;
    }
}

export async function shippingUsers(user_messager: string, message: string) {
    if (message.split(" ")[0] == "!ship") {
        let message_array = message.split(" ");
        if (message_array.length < 3) {
            await sendChatMessage(
                `${message_array[1]} and ${user_messager} are ${randomPercantage()}% in love!`,
            );
        } else {
            await sendChatMessage(
                `${message_array[1]} and ${message_array[2]} are ${randomPercantage()}% in love!`,
            );
        }
    }
}

export async function sendRaidMessages() {
    await sendChatMessage(
        'if stream_status(Threev) == "offline" {    println!("Raiding a channel!");    raid();}',
    );
    await sendChatMessage(
        'threev6Smokinghead if stream_status(Threev) == "offline" { println!("Raiding a channel!"); raid();} threev6Smokinghead',
    );
}
