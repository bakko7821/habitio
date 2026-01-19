import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { Habit } from "../models/Habits/Habit";
import { where } from "sequelize";

export const router = Router();

router.post("/new-habit", authMiddleware, async(req: AuthRequest, res: Response) => {
    try {
        const {name, color, type} = req.body;

        if (!name || !color || !type) {
            return res.status(400).json({
                message: "name, color и type обязательны",
            });
        }

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Не авторизован",
            });
        }

        const habit = await Habit.create({
            name,
            color,
            type,
            ownerId: userId,
        });

        return res.status(201).json(habit);

    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({
            message: "Ошибка при создании привычки",
        });
    }
})

router.get("/get-all-habits", authMiddleware, async(req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Не авторизован",
            });
        }

        const data = await Habit.findAll({ where: { ownerId: userId } })

        return res.status(200).json(data);

    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({
            message: "Ошибка при получение всех привычек",
        });
    }
})

export default router