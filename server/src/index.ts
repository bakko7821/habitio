import { app } from "./app";
import { sequelize } from "./db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("DB connected");

    app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
    
  } catch (e) {
    console.error(e);
  }
}

start();
