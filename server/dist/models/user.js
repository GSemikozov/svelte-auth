"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_OPTIONS = exports.USER_ATTRIBUTES = exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("db");
class User extends sequelize_1.Model {
    get id() {
        return this.id;
    }
    get telegramId() {
        return this.telegramId;
    }
    get password() {
        return this.password;
    }
    get token() {
        return this.token;
    }
}
exports.User = User;
exports.USER_ATTRIBUTES = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    telegramId: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    token: sequelize_1.DataTypes.STRING,
};
exports.USER_OPTIONS = {
    sequelize: db_1.sequelize,
    timestamps: true,
    modelName: "user",
};
