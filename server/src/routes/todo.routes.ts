import { Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { TodoLog } from "../models/TodoLog";
import { getTodayDate } from "../utils/date";

const router = Router()

router.post('/new-todo-task', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Не авторизован",
            });
        }

        const {name} = req.body;

        const task = await TodoLog.create({
            date: getTodayDate(),
            task: name,
            ownerId: userId,
            isDone: false,
        });

        return res.status(201).json(task);
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).json({
            message: "Ошибка при добавление новой задачи",
        });
    }
})

router.get('/get-todo-task-from-date/:date', authMiddleware, async(req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Не авторизован",
            });
        }

        const {date} = req.params;

        const allTodayTask = await TodoLog.findAll({
            where: {
                ownerId: userId,
                date: date,
            },
        })

        return res.status(200).json(allTodayTask)

    } catch (error: unknown) {
        console.log(error)
        return res.status(500).json({
            message: "Ошибка при получение задач по дате.",
        });
    }
})

router.get('/get-todo-task-from-id/:id', authMiddleware, async(req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Не авторизован",
            });
        }

        const {id} = req.params;

        const task = await TodoLog.findOne({
            where: {
                id: id,
                ownerId: userId,
            },
        });

        return res.status(200).json(task)
    } catch (error: unknown) {
        console.error(error)
        return res.status(500).json({
            message: "Ошибка при получение задачи по ID"
        })
    }
})

export default router