import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import habitRouter from "./routes/habits.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/habits", habitRouter);
