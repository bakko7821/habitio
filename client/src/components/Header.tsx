import { AddIcon } from "../assets/icons"
import type { HeaderProps } from "../types/types"
import { textColor } from "../types/variables"

export const Header = ({title, showHabitButton }: HeaderProps) => {
    function createNewHabbit() {
        console.log('создание новой привычки')
    }

    return (
        <header className="w-full flex items-center justify-between px-3 py-2">
            <h1 style={{ color: textColor }}
                className="font-sf text-2xl font-bold uppercase leading-[1.2]">{title}</h1>
            {showHabitButton && (
                <button 
                    onClick={() => createNewHabbit()}
                    className="addHabbitButton">
                    <AddIcon />
                </button>
            )}
        </header>
    )
}