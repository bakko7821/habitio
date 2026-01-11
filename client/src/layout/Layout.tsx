// layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom"
import { Header } from "../components/Header"
import { Navigation } from "../components/Navigation"
import { bgColor, textColor } from "../types/variables"

const getTitleByPath = (pathname: string) => {
  if (pathname.startsWith("/todo")) return "To-do Track"
  if (pathname.startsWith("/habit")) return "Habit Track"
  if (pathname.startsWith("/new-habit")) return "New Habit"
  if (pathname.startsWith("/pomodoro")) return "Pomodoro"
  if (pathname.startsWith("/chart")) return "Chart"
  if (pathname.startsWith("/profile")) return "Profile"
  return ""
}

export const Layout = () => {
  const location = useLocation()
  const pathname = location.pathname

  const title = getTitleByPath(pathname) || ""
  const showHabitButton = pathname === "/habit"


  return (
    <div style={{ backgroundColor: bgColor, color: textColor, width: '100vw', minHeight: '100vh' }} 
        className="p-4 gap-4 flex flex-col items-center justify-between">
      <Header title={title} showHabitButton={showHabitButton}  />

      <main className="flex flex-col flex-1 w-full h-full px-2">
        <Outlet />
      </main>

      <Navigation />
    </div>
  )
}
