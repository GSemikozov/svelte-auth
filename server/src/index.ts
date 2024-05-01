import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import "./init";
import "models/init";
import { PORT } from "config";

import type { Express, Request, Response } from "express";
import { authService } from "services/auth";
import { verifyToken } from "middlewares";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_: Request, response: Response) => {
    response.send("healthcheck");
});

app.post("/pre-login", async (request: Request, response: Response) => {
    const payload = request.body;

    try {
        const preLoginResult = await authService.preLogin(payload);

        console.log(preLoginResult);

        if (!preLoginResult) {
            throw new Error();
        }

        response.status(201).json({
            status: "ok",
            message: "Login challenge started",
        });
    } catch (error: any) {
        response.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});

app.post("/login", async (request: Request, response: Response) => {
    const payload = request.body;

    try {
        const jwtToken = await authService.login(payload);

        response.status(201).json({
            status: "ok",
            message: "User auth successfully",
            result: { jwtToken },
        });
    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Auth failed",
        });
    }
});

app.post("/register", async (request: Request, response: Response) => {
    const payload = request.body;

    try {
        const token = await authService.register(payload);

        response.status(201).json({
            status: "ok",
            message: "User registered successfully",
            result: { token },
        });
    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Registration failed",
        });
    }
});

app.get(
    "/get-current-user",
    verifyToken,
    async (request: Request, response: Response) => {
        const userId = (request as any).userId;

        try {
            const currentUser = await authService.getCurrentUser(userId);

            response.status(200).json({
                status: "ok",
                result: { user: currentUser },
            });
        } catch (error) {
            console.log(error);

            response.status(500).json({
                status: "error",
                message: "Internal Error",
            });
        }
    }
);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
