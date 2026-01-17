import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/db";

import * as models from "./models/index";

dotenv.config();
const app = express();
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // Синхронизация моделей
    await sequelize.sync({ alter: true }); // теперь таблицы создадутся правильно
    console.log("✅ All models synced");
    console.log("loaded models:", sequelize.models);

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
