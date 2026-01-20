import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { Habit } from "../models/Habits/Habit";
import { formatDate, getTodayDate } from "../utils/date";
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

        const logsToCreate = [];
        const today = new Date();
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            logsToCreate.push({
                habitId: habit.id,
                date: formatDate(date),
                value: null,
                isDone: null,
                isSkip: null,
            });
        }

        await HabitLog.bulkCreate(logsToCreate);

        const createdLogs = await HabitLog.findAll({
            where: { habitId: habit.id },
            order: [["date", "DESC"]],
        });

        return res.status(201).json({
            ...habit.toJSON(),
            logs: createdLogs,
        });

    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({
            message: "Ошибка при создании привычки",
        });
    }
})

router.get("/get-habit-from-id/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const habitId = Number(req.params.id);

      if (!userId) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      if (Number.isNaN(habitId)) {
        return res.status(400).json({ message: "Некорректный id привычки" });
      }

      const habit = await Habit.findOne({
        where: {
          id: habitId,
          ownerId: userId,
        },
      });

      if (!habit) {
        return res.status(404).json({ message: "Привычка не найдена" });
      }

      let logs = await HabitLog.findAll({
        where: { habitId: habit.id },
        order: [["date", "DESC"]],
      });

      return res.status(200).json({
        id: habit.id,
        name: habit.name,
        color: habit.color,
        type: habit.type,
        logs,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при получении привычки",
      });
    }
  }
);

router.delete("/delete-habit-from-id/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const habitId = Number(req.params.id);

        if (!userId) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        if (Number.isNaN(habitId)) {
            return res.status(400).json({ message: "Некорректный id привычки" });
        }

        const habit = await Habit.findOne({ where: { id: habitId } });

        if (!habit) {
            return res.status(404).json({ message: "Привычка не найдена" });
        }

        if (habit.ownerId !== userId) {
            return res.status(403).json({ message: "Нет прав на удаление этой привычки" });
        }

        await HabitLog.destroy({ where: { habitId: habit.id } });

        await habit.destroy();

        return res.status(200).json({ message: "Привычка успешно удалена" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка при удалении привычки" });
    }
});


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