const API_URL = "http://localhost:5000/api"

export const getTodayTodos = async (userId: number) => {
  const res = await fetch(`${API_URL}/todos/today/${userId}`)

  if (!res.ok) {
    throw new Error("Ошибка загрузки задач")
  }

  return res.json()
}

export const getTodosByDay = async (userId: number, day: string) => {
  const res = await fetch(`${API_URL}/todos/${userId}/${day}`)

  if (!res.ok) {
    throw new Error("Ошибка загрузки задач")
  }

  return res.json()
}

export const addTodo = async (userId: number, name: string) => {
  const res = await fetch(`${API_URL}/todos/new-todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  })

  if (!res.ok) {
    throw new Error("Ошибка добавления задачи")
  }

  return res.json()
}
