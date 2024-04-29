export type PreLoginPayload = {
    telegramId: string;
    password: string;
};

export type LoginPayload = PreLoginPayload & {
    token: string;
};

export type RegisterPayload = {
    telegramId: string;
    password: string;
};
