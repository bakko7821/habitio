import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// ✅ Импорт всех моделей
import { User } from "../models/User.js";
import { Habit } from "../models/Habit.js";
import { HabitLog } from "../models/HabitLog.js";
import { Kanban } from "../models/Kanban.js";
import { Task } from "../models/Task.js";
import { Tag } from "../models/Tag.js";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

// 🔹 Синхронизация моделей (это создаст таблицы)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: true }); // или { force: true } для пересоздания таблиц
    console.log("✅ All models synced");
  } catch (err) {
    console.error("❌ DB error:", err);
  }
})();
