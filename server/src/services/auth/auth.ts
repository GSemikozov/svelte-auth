import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "config";
import { User } from "models";

import type { PreLoginPayload, LoginPayload, RegisterPayload } from "./types";

class AuthService {
    async preLogin(payload: PreLoginPayload) {
        const { telegramId, password } = payload;

        const user = await User.findOne({
            where: { telegramId },
        });

        if (!user) {
            throw new Error("Authentication failed");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Authentication failed");
        }

        return true;
    }

    async login(payload: LoginPayload) {
        const { telegramId, password, token } = payload;

        const user = await User.findOne({
            where: { telegramId, token },
        });

        if (!user) {
            throw new Error("Authentication failed");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Authentication failed");
        }

        const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        return jwtToken;
    }

    async register(payload: RegisterPayload) {
        const { telegramId, password } = payload;

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(12).toString("base64url");

        const user = new User({
            telegramId,
            token,
            password: hashedPassword,
        });

        await user.save();

        return token;
    }

    async checkToken(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (typeof decoded === "string") {
                throw new Error();
            }

            return decoded.userId;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    async getCurrentUser(userId: string) {
        const user = await User.findByPk(userId);

        return user;
    }
}

export const authService = new AuthService();
