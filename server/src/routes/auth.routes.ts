import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { login, password } = req.body;

  const candidate = await User.findOne({ where: { login } });
  if (candidate) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ login, password: hashPassword });

  return res.json({ id: user.id, login: user.login });
});

authRouter.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ where: { login } });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  return res.json({ token });
});
