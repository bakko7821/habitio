import { Router } from "express"
import { createHabit, getHabitsByUser } from "../controllers/habit.controller"

const router = Router()

router.get("/all-habits/:user_id", getHabitsByUser)
router.post("/new-habit", createHabit)

export default router
