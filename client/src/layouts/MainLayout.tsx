import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import useAuthGuard from "../hooks/useAuthGuard";

export default function MainLayout() {
    useAuthGuard()

    const location = useLocation()
    const pathname = location.pathname
    const titleMap: Array<{ match: RegExp; title: string }> = [
        { match: /^\/habits$/, title: "Habits" },
        { match: /^\/new-habit$/, title: "New Habit" },
        { match: /^\/todo(\/.*)?$/, title: "Todo" },
        { match: /^\/kanban$/, title: "Kanban" },
        { match: /^\/matrix$/, title: "Eisenhower Matrix" },
        { match: /^\/pomodoro$/, title: "Pomodoro" },
        { match: /^\/chart$/, title: "Chart" },
        { match: /^\/profile$/, title: "Profile" },
    ]
    const title = titleMap.find(item => item.match.test(pathname))?.title ?? ""

    const isOpenHabitInfo = /^\/habit\/\d+\/info$/.test(pathname);
    const habitId = (() => {
        const match = pathname.match(/^\/habit\/(\d+)\/info$/);
        return match ? Number(match[1]) : null;
    })();

    const titleInfo = `Привычка: ${habitId}`;

    return (
        <>
            {!isOpenHabitInfo ? <Header title={title}/> : <Header isOpenHabitInfo={isOpenHabitInfo} title={titleInfo}/>}
            <main className="h-full w-full flex flex-col gap-4">
                <Outlet />
            </main>
        </>
    )
}