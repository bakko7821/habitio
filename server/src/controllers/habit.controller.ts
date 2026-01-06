import { Request, Response } from "express"
import { Habit, HabitIcon, HabitLog } from "../models"
import sequelize from "../config/database"

export const getHabitsByUser = async (req: Request, res: Response) => {
  const { user_id } = req.params

  const habits = await Habit.findAll({
    where: { user_id },
    include: [
      {
        model: HabitIcon,
        as: "icon",
      },
      {
        model: HabitLog,
        as: "logs",
      },
    ],
    order: [[{ model: HabitLog, as: "logs" }, "date", "ASC"]],
  })

  const result = habits.map((habit) => {
    const logs = habit.logs ?? []

    const weeksMap: Record<string, any[]> = {}

    for (const log of logs) {
      const dayName = new Date(log.date)
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase()

      if (!weeksMap[dayName]) weeksMap[dayName] = []

      weeksMap[dayName].push({
        date: log.date,
        status: log.status,
        value: log.value,
      })
    }

    return {
      id: habit.id,
      name: habit.name,
      icon: habit.icon,
      weeks: Object.entries(weeksMap).map(([name, days]) => ({
        name,
        days,
      })),
    }
  })

  res.json(result)
}

export const createHabit = async (req: Request, res: Response) => {
  const { user_id, name, color } = req.body

  if (!user_id || !name || !color) {
    return res.status(400).json({ message: "Не все обязательные поля заполнены" })
  }

  try {
    await sequelize.transaction(async (t) => {
      // 1️⃣ Создаем привычку
      const habit = await Habit.create(
        { user_id, name },
        { transaction: t }
      )

      // 2️⃣ Создаем иконку
      const icon = await HabitIcon.create(
        { habit_id: habit.id, url: "https://www.svgrepo.com/show/61821/gym-weight.svg", color },
        { transaction: t }
      )

      // 3️⃣ Создаем 93 пустых лога (последняя дата = сегодня, остальные идут на 1 день назад)
      const logsData = []
      const today = new Date()
      for (let i = 92; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        logsData.push({
          habit_id: habit.id,
          date: date.toISOString().split("T")[0],
          status: false
        })
      }
      await HabitLog.bulkCreate(logsData, { transaction: t })

      res.json({
        id: habit.id,
        name: habit.name,
        icon,
        weeks: [] // можно потом строить через функцию buildWeeks
      })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Ошибка сервера" })
  }
}

