import { Model, DataTypes } from "sequelize";

import { sequelize } from "db";

export class User extends Model {
    get telegramId(): string {
        return this.telegramId;
    }

    get password(): string {
        return this.password;
    }

    get token(): string {
        return this.token;
    }
}

export const USER_ATTRIBUTES = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    telegramId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
};

export const USER_OPTIONS = {
    sequelize,
    timestamps: true,
    modelName: "user",
};
