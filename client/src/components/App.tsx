import { Route, Routes, Navigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import { HabitPage } from "../pages/HabitPage"
import { TodoPage } from "../pages/TodoPage"
import { KanbanPage } from "../pages/KanbanPage"
import { AuthPage } from "../pages/Auth/AuthPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<AuthPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/habit" />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/todo/:date" element={<TodoPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
      </Route>
    </Routes>
  )
}

