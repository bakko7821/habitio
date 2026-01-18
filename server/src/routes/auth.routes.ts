import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ username, email, password: hashPassword });

    return res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error: unknown) {
    console.error(error)
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
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

    return res.json({ id: user.id, token });
  } catch (error: unknown) {
    console.error(error)
  }
});

export default router
