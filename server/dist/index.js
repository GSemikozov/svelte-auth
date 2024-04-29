"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./init");
require("models/init");
const config_1 = require("config");
const auth_1 = require("services/auth");
const middlewares_1 = require("middlewares");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get("/", (_, response) => {
    response.send("healthcheck");
});
app.post("/pre-login", async (request, response) => {
    const payload = request.body;
    try {
        const preLoginResult = await auth_1.authService.preLogin(payload);
        console.log(preLoginResult);
        if (!preLoginResult) {
            throw new Error();
        }
        response.status(201).json({
            status: "ok",
            message: "Login challenge started",
        });
    }
    catch (error) {
        response.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
app.post("/login", async (request, response) => {
    const payload = request.body;
    try {
        const jwtToken = await auth_1.authService.login(payload);
        response.status(201).json({
            status: "ok",
            message: "User auth successfully",
            result: { jwtToken },
        });
    }
    catch (error) {
        response.status(500).json({
            status: "error",
            message: "Auth failed",
        });
    }
});
app.post("/register", async (request, response) => {
    const payload = request.body;
    try {
        const token = await auth_1.authService.register(payload);
        response.status(201).json({
            status: "ok",
            message: "User registered successfully",
            result: { token },
        });
    }
    catch (error) {
        response.status(500).json({
            status: "error",
            message: "Registration failed",
        });
    }
});
app.get("/get-current-user", middlewares_1.verifyToken, async (request, response) => {
    const userId = request.userId;
    try {
        const currentUser = await auth_1.authService.getCurrentUser(userId);
        response.status(200).json({
            status: "ok",
            result: { user: currentUser },
        });
    }
    catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal Error",
        });
    }
});
app.listen(config_1.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${config_1.PORT}`);
});
