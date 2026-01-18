import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import dotenv from "dotenv";
import { Habit } from "./models/Habit";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [User, Habit],
  logging: false,
});
