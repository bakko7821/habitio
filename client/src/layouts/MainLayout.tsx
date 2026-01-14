import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import useAuthGuard from "../hooks/useAuthGuard";
import useTitleFromPath from "../hooks/useTitleFromPath";

export default function MainLayout() {
    useAuthGuard()
    const title = useTitleFromPath()
    
    return (
        <>
            <Header title={`${title}`}/>
            <main>
                <Outlet />
            </main>
        </>
    )
}