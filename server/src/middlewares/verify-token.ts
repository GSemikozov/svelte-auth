import { authService } from "services";

import type { NextFunction, Request, Response } from "express";

export const verifyToken = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.header("Authorization");

    if (!token) {
        return response.status(401).json({
            error: "Access denied",
        });
    }

    try {
        const userId = authService.checkToken(token);

        (request as any).userId = userId;

        next();
    } catch (error) {
        response.status(401).json({
            error: "Invalid token",
        });
    }
};
