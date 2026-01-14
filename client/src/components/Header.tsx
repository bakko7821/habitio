import { useState } from "react";
import { BurgerMenuIcon } from "../assets/icons";
import { NavigationMenu } from "./UI/NavigationMenu";

interface HeaderProps {
    title: string;
}

export const Header = ({title}: HeaderProps) => {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false)
    return (
        <header className="flex items-center justify-between p-3">
            <p className="text-2xl font-semibold">{title}</p>
            <button onClick={
                () => setIsNavigationOpen(true)
            }>
                <BurgerMenuIcon width={32} height={32} />
            </button>
            {isNavigationOpen && (
                <NavigationMenu onClose={() => setIsNavigationOpen(false)} />
            )}
        </header>
    )
}