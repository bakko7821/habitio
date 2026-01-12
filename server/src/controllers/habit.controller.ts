import { Request, Response } from "express"
import sequelize from "../config/database"
import { Habit } from "../models/Habits/Habit"
import { HabitIcon } from "../models/Habits/HabitIcon"
import { HabitLog } from "../models/Habits/HabitLog"

export const getHabitsByUser = async (req: Request, res: Response) => {
  const WEEK_ORDER = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]

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
        id: log.id,
        date: log.date,
        status: log.status,
        value: log.value,
      })
    }

    return {
      id: habit.id,
      name: habit.name,
      icon: habit.icon,
      weeks: Object.entries(weeksMap)
      .sort(
        ([a], [b]) =>
          WEEK_ORDER.indexOf(a) - WEEK_ORDER.indexOf(b)
      )
      .map(([name, days]) => ({
        name,
        days,
      }))

    }
  })

  res.json(result)
}

export const createHabit = async (req: Request, res: Response) => {
  const { user_id, name, color, icon_url } = req.body;

  if (!user_id || !name || !color || !icon_url) {
    return res.status(400).json({ message: "Не все обязательные поля заполнены" });
  }

  try {
    await sequelize.transaction(async (t) => {
      // 1️⃣ Создаем привычку
      const habit = await Habit.create({ user_id, name }, { transaction: t });

      // 2️⃣ Создаем иконку с цветом и ссылкой
      const icon = await HabitIcon.create(
        {
          habit_id: habit.id,
          url: icon_url,
          color,
        },
        { transaction: t }
      );

      // 3️⃣ Создаем 121 пустой лог
      const logsData = [];
      const today = new Date();
      for (let i = 121; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        logsData.push({
          habit_id: habit.id,
          date: date.toISOString().split("T")[0],
          status: false,
        });
      }
      await HabitLog.bulkCreate(logsData, { transaction: t });

      res.json({
        id: habit.id,
        name: habit.name,
        icon,
        weeks: [],
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateHabitLogStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (typeof status !== "boolean") {
      return res.status(400).json({
        message: "status must be boolean",
      })
    }

    const habitLog = await HabitLog.findByPk(id)

    if (!habitLog) {
      return res.status(404).json({
        message: "HabitLog not found",
      })
    }

    habitLog.status = status
    await habitLog.save()

    res.json(habitLog)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}


