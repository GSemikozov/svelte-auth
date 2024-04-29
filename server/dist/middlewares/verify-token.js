"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const services_1 = require("services");
const verifyToken = async (request, response, next) => {
    const token = request.header("Authorization");
    if (!token) {
        return response.status(401).json({
            error: "Access denied",
        });
    }
    try {
        const userId = services_1.authService.checkToken(token);
        request.userId = userId;
        next();
    }
    catch (error) {
        response.status(401).json({
            error: "Invalid token",
        });
    }
};
exports.verifyToken = verifyToken;
