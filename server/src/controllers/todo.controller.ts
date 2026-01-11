import { Request, Response } from "express"
import { Todo } from "../models/Todo/Todo"
import { Op } from "sequelize"

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { userId, name } = req.body

    if (!userId || !name) {
      return res.status(400).json({ message: "Missing data" })
    }

    const today = new Date().toISOString().split("T")[0]

    const todo = await Todo.create({
      user_id: userId,
      name,
      date: today,
    })

    return res.json({
      id: todo.id,
      name: todo.name,
      checked: todo.checked,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getTodayTodosByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const today = new Date().toISOString().split("T")[0]

    const todos = await Todo.findAll({
      where: {
        user_id: userId,
        date: today,
      },
      attributes: ["id", "name", "checked", "date"],
      order: [["id", "ASC"]],
    })

    if (!todos.length) {
      return res.json([])
    }

    return res.json([
      {
        date: today,
        tasks: todos.map(todo => ({
          id: todo.id,
          name: todo.name,
          checked: todo.checked,
        })),
      },
    ])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getTodosByUserByDate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { day } = req.params

    const todos = await Todo.findAll({
      where: {
        user_id: userId,
        date: day,
      },
      attributes: ["id", "name", "checked", "date"],
      order: [["id", "ASC"]],
    })

    if (!todos.length) {
      return res.json([])
    }

    return res.json([
      {
        date: day,
        tasks: todos.map(todo => ({
          id: todo.id,
          name: todo.name,
          checked: todo.checked,
        })),
      },
    ])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getTodosByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const todos = await Todo.findAll({
      where: { user_id: userId },
      attributes: ["id", "name", "checked", "date"],
      order: [
        ["date", "DESC"],
        ["id", "ASC"],
      ],
    })

    const grouped = todos.reduce<Record<string, any[]>>((acc, todo) => {
      if (!acc[todo.date]) acc[todo.date] = []

      acc[todo.date].push({
        id: todo.id,
        name: todo.name,
        checked: todo.checked,
      })

      return acc
    }, {})

    const result = Object.entries(grouped).map(([date, tasks]) => ({
      date,
      tasks,
    }))

    return res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

