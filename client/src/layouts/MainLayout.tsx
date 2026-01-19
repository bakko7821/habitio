import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
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

    const [titleInfo, setTitleInfo] = useState('');

    useEffect(() => {
        if (!isOpenHabitInfo || habitId === null) return;

        // let cancelled = false;

        // const loadHabitTitle = async () => {
        //     try {
        //         const res = await fetch(`/api/habits/${habitId}`);
        //         const data = await res.json();

        //         if (!cancelled) {
        //             setTitleInfo(data.title);
        //         }
        //     } catch {
        //         if (!cancelled) {
        //             setTitleInfo("Привычка");
        //         }
        //     }
        // };

        // loadHabitTitle();

        // return () => {
        //     cancelled = true;
        // };

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitleInfo(`Привычка: ${habitId}`)
    }, [isOpenHabitInfo, habitId]);

    
    return (
        <>
            {!isOpenHabitInfo ? <Header title={title}/> : <Header isOpenHabitInfo={isOpenHabitInfo} title={titleInfo}/>}
            <main className="h-full w-full flex flex-col gap-4">
                <Outlet />
            </main>
        </>
    )
}