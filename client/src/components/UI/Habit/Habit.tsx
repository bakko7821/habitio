import { useNavigate } from "react-router-dom";
import type { HabitProps } from "../../../utils/types/habit.ts"
import { secondBgColor, textColor } from "../../../utils/types/variables.ts"

interface HabitComponentProps {
    habit: HabitProps;
}

export const Habit = ({habit}: HabitComponentProps) => {
    const navigate = useNavigate()
    return (
        <div 
            onClick={() => navigate(`/habit/${habit.id}/info`)}
            style={{backgroundColor: secondBgColor}} 
            className="w-full px-4 py-2 flex items-center justfy-beween"
        >
            <div className="flex items-center gap-2">
                <div style={{backgroundColor: habit.color}} className="w-6 h-6 rounded-sm"></div>
                <p style={{color: textColor}} className="text-base font-medium">{habit.name}</p>
            </div>
        </div>
    )
}