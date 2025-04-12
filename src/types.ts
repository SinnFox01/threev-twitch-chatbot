export type Condition = {
    broadcaster_user_id?: string;
    user_id?: string;
    to_broadcaster_user_id?: string;
    from_broadcaster_user_id?: string;
};

export type User = {
    user_id: string;
    first: number;
    second: number;
    third: number;
    daily: number;
    created_at?: string;
};
