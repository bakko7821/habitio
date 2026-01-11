// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { HabitPage } from "../pages/HabitPage"
import { ProfilePage } from "../pages/ProfilePage"
import { TodoPage } from "../pages/TodoPage"
import { PomodoroPage } from "../pages/PomodoroPage"
import { ChartPage } from "../pages/ChartPage"
import { Layout } from "../layout/Layout"
import { useEffect } from "react"
import { telegramAuth } from "../api/telegramAuth"
import { CreateNewHabitPage } from "../pages/CreateNewHabitPage"

function App() {
  
  useEffect(() => {
    telegramAuth()
      .then((user) => {
        console.log('Authorized user:', user);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const USER_ID = 1

  const getTodayPathDate = () => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${day}-${month}`
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/habit" />} />
          <Route path="/habit" element={<HabitPage />} />
          <Route path="/new-habit" element={<CreateNewHabitPage />} />

          <Route
            path="/todo"
            element={<Navigate to={`/todo/${getTodayPathDate()}/${USER_ID}`} replace />}
          />
          <Route path="/todo/:date/:userID" element={<TodoPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
