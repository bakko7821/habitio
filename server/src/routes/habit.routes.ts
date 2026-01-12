import { Router } from "express"
import { createHabit, getHabitsByUser, updateHabitLogStatus } from "../controllers/habit.controller"

const router = Router()

router.post("/new-habit", createHabit)
router.get("/all-habits/:user_id", getHabitsByUser)
router.put("/habit-logs/:id", updateHabitLogStatus)


export default router
