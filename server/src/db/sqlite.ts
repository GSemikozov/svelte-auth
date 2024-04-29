import { Sequelize } from "sequelize";

// Create Sequelize instance
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
