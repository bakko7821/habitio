import { useEffect, useState } from "react"
import { AddIcon, ArrowIcon } from "../assets/icons"
import { buttonColor, buttonTextColor, hintColor } from "../types/variables"
import { Checkbox } from "../components/UI/Checkbox"
import type { TodoTask } from "../types/types"
import { addTodo, getTodosByDay } from "../api/todo.api"
import { useNavigate, useParams } from "react-router-dom"
import { formatDateTitle, shiftPathDate, toISODate } from "../utils/date"

export const TodoPage = () => {
  const { date, userID } = useParams<{
    date: string
    userID: string
  }>()

  const navigate = useNavigate()

  const titleDate = date ? formatDateTitle(date) : ""

  const [tasks, setTasks] = useState<TodoTask[]>([])
  const [newTask, setNewTask] = useState("")

  const DATE = date ? toISODate(date) : null
  const USER_ID = userID ? Number(userID) : null


  useEffect(() => {
    if (!DATE || !USER_ID) return

    const fetchTodos = async () => {
      try {
        const data = await getTodosByDay(USER_ID, DATE)

        if (data.length > 0) {
          setTasks(data[0].tasks)
        } else {
          setTasks([])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchTodos()
  }, [DATE, USER_ID])


  const handleAddTodo = async () => {
    if (!newTask.trim()) return

    try {
      if (!USER_ID) return

      const created = await addTodo(USER_ID, newTask)

      setTasks(prev => [
        ...prev,
        {
          id: created.id,
          name: created.name,
          checked: created.checked,
        },
      ])

      setNewTask("")
    } catch (err) {
      console.error(err)
    }
  }

  if (!date || !userID) return null

  return (
    <div className="flex flex-col gap-3 relative p-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() =>
            navigate(`/todo/${shiftPathDate(date, -1)}/${userID}`)
          }
          className="rotate-[90deg]">
          <ArrowIcon />
        </button>
        <span className="text-2xl font-bold">{titleDate}</span>
        <button 
          onClick={() =>
            navigate(`/todo/${shiftPathDate(date, +1)}/${userID}`)
          }
          className="rotate-[-90deg]">
          <ArrowIcon />
        </button>
      </div>

      <div style={{ backgroundColor: buttonColor }} className="plug"></div>

      {/* Add todo */}
      <div className="flex items-center justify-center gap-2">
        <input
          className="w-full text-center p-2 text-base"
          type="text"
          placeholder="Новая задача"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button
          onClick={handleAddTodo}
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          className="addToDoButton p-1 rounded-xl"
        >
          <AddIcon />
        </button>
      </div>

      <div style={{ backgroundColor: buttonColor }} className="plug"></div>

      {/* Todos */}
      {tasks.length === 0 ? (
        <p
          style={{ color: hintColor }}
          className="font-sf text-base font-medium leading-[1.3] "
        >У вас отсутствуют задачи на сегодня</p>
      ) : (
        <div className="flex flex-col w-full gap-2">
          {tasks.map(task => (
            <Checkbox
              key={task.id}
              task={task}
              checked={task.checked}
              onChange={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  )
}
