import { Route, Routes } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import { HabitPage } from "../pages/HabitPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={} />
        <Route path="/auth/register" element={} />
        <Route path="/auth/recovery" element={} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/todo/:date" element={} />
        <Route path="/kanban" element={} />
      </Route>
    </Routes>
  )
}

