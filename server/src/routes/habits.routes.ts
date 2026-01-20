import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { Habit } from "../models/Habits/Habit";
import { getTodayDate } from "../utils/date";
import { HabitLog } from "../models/Habits/HabitLog";

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

router.get("/get-all-habits", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        const today = getTodayDate();

        const habits = await Habit.findAll({
            where: { ownerId: userId },
        });

        const result = [];

        for (const habit of habits) {
            let logs = await HabitLog.findAll({
                where: { habitId: habit.id },
                order: [['date', 'DESC']],
            });

            const hasTodayLog = logs.some(log => log.date === today);

            if (!hasTodayLog) {
                const newLog = await HabitLog.create({
                    habitId: habit.id,
                    date: today,
                    value: null,
                    isDone: null,
                    isSkip: null,
                });

                logs.unshift(newLog);
            }

            result.push({
                id: habit.id,
                name: habit.name,
                color: habit.color,
                type: habit.type,
                logs,
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Ошибка при получении привычек",
        });
    }
});

export default router