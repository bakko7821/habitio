import { Route, Routes, Navigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import { HabitPage } from "../pages/Habits/HabitPage"
import { TodoPage } from "../pages/TodoPage"
import { KanbanPage } from "../pages/KanbanPage"
import dateToPath from "../utils/date"
import { EisenhowerMatrix } from "../pages/EisenhowerMatrixPage"
import { InfoHabitPage } from "../pages/Habits/InfoHabitPage"
import { RegisterForm } from "../pages/Auth/RegisterForm"
import { RecoveryForm } from "../pages/Auth/RecoveryForm"
import { LoginForm } from "../pages/Auth/LoginForm"
import { NewHabitPage } from "../pages/Habits/NewHabitPage"

export default function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="recovery" element={<RecoveryForm />} />
      </Route>

      {/* MAIN */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/habits" />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/new-habit" element={<NewHabitPage />} />
        <Route path="/habit/:id/info" element={<InfoHabitPage />} />
        <Route path="/todo" element={<Navigate to={`/todo/${dateToPath()}`} />} />
        <Route path="/todo/:date" element={<TodoPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/matrix" element={<EisenhowerMatrix />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}

