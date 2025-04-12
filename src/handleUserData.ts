import { User } from "./types";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { DATABASE_FILEPATH } from "./constants";

export async function getUser(user_id: string): Promise<User> {
    const db = await open({
        filename: DATABASE_FILEPATH,
        driver: sqlite3.Database,
    });
    let user = await db.get("SELECT * FROM users WHERE user_id = ?", [user_id]);
    return user;
}

export async function createUser(user: User) {
    const db = await open({
        filename: DATABASE_FILEPATH,
        driver: sqlite3.Database,
    });
    db.run(
        "INSERT INTO users (user_id, first, second, third, daily) VALUES (?, ?, ?, ?, ?)",
        [user.user_id, user.first, user.second, user.third, user.daily],
    );
}

export async function updateUser(user: User) {
    const db = await open({
        filename: DATABASE_FILEPATH,
        driver: sqlite3.Database,
    });
    db.run(
        "UPDATE users SET first = ?, second = ?, third = ?, daily = ? WHERE user_id = ?",
        [user.first, user.second, user.third, user.daily, user.user_id],
    );
}
