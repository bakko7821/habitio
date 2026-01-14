import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
// import useAuthGuard from "../hooks/useAuthGuard";

const titlesMap: Record<string, string> = {
  "/habit": "Habits",
  "/todo": "Todo",
  "/kanban": "Kanban",
  "/pomodoro": "Pomodoro",
  "/chart": "Chart",
  "/profile": "Profile",
}

export default function MainLayout() {
    // useAuthGuard()

    const location = useLocation()
    const title = titlesMap[location.pathname] ?? ""
    
    return (
        <>
            <Header title={title}/>
            <main>
                <Outlet />
            </main>
        </>
    )
}