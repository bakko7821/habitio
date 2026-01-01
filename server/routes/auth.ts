import { Request, Response, Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = Router();

// Типизация данных от Telegram
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
}

const BOT_TOKEN = process.env.BOT_TOKEN!;
const JWT_SECRET = process.env.JWT_SECRET!;

// Валидация initData от Telegram
function verifyTelegramInitData(initData: string): TelegramUser | null {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secretKey = crypto.createHash("sha256").update(BOT_TOKEN).digest();
  const checkHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (checkHash !== hash) return null;

  // Безопасно парсим объект
  const user: TelegramUser = {
    id: Number(params.get("id")),
    first_name: params.get("first_name")!,
    last_name: params.get("last_name") || undefined,
    username: params.get("username") || undefined,
    photo_url: params.get("photo_url") || undefined,
    auth_date: Number(params.get("auth_date")),
  };

  return user;
}

// POST /api/auth/telegram
router.post("/telegram", (req: Request, res: Response) => {
  const { initData } = req.body;
  if (!initData) return res.status(400).json({ error: "No initData" });

  const user = verifyTelegramInitData(initData);
  if (!user) return res.status(401).json({ error: "Invalid Telegram auth" });

  // TODO: найти или создать пользователя в базе
  // const dbUser = await User.findOrCreate({ telegramId: user.id, ... })

  // Создаём JWT
  const token = jwt.sign(
    { telegramId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

export default router;
