"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("config");
const models_1 = require("models");
class AuthService {
    async preLogin(payload) {
        const { telegramId, password } = payload;
        const user = await models_1.User.findOne({
            where: { telegramId },
        });
        if (!user) {
            throw new Error("Authentication failed");
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Authentication failed");
        }
        return true;
    }
    async login(payload) {
        const { telegramId, password, token } = payload;
        const user = await models_1.User.findOne({
            where: { telegramId, token },
        });
        if (!user) {
            throw new Error("Authentication failed");
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Authentication failed");
        }
        const jwtToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        return jwtToken;
    }
    async register(payload) {
        const { telegramId, password } = payload;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const token = crypto_1.default.randomBytes(12).toString("base64url");
        const user = new models_1.User({
            telegramId,
            token,
            password: hashedPassword,
        });
        await user.save();
        return token;
    }
    async checkToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            if (typeof decoded === "string") {
                throw new Error();
            }
            return decoded.userId;
        }
        catch (error) {
            throw new Error("Invalid token");
        }
    }
    async getCurrentUser(userId) {
        const user = await models_1.User.findByPk(userId);
        return user;
    }
}
exports.authService = new AuthService();
