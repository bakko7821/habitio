import { Route, Routes, Navigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import { HabitPage } from "../pages/HabitPage"
import { TodoPage } from "../pages/TodoPage"
import { KanbanPage } from "../pages/KanbanPage"
import { AuthPage } from "../pages/Auth/AuthPage"
import dateToPath from "../utils/date"
import { EisenhowerMatrix } from "../pages/EisenhowerMatrixPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<AuthPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/habits" />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/todo" element={<Navigate to={`/todo/${dateToPath()}`} />} />
        <Route path="/todo/:date" element={<TodoPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/matrix" element={<EisenhowerMatrix />} />
      </Route>
    </Routes>
  )
}

