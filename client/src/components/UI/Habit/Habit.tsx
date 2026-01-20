import { useNavigate } from "react-router-dom";
import type { HabitProps } from "../../../utils/types/habit.ts"
import { secondBgColor, secondTextColor, textColor } from "../../../utils/types/variables.ts"
import { CrossIcon, TickIcon } from "../../../assets/icons.tsx";

interface HabitComponentProps {
    habit: HabitProps;
}

export const Habit = ({habit}: HabitComponentProps) => {
    const navigate = useNavigate()

    return (
        <div 
            onClick={() => navigate(`/habit/${habit.id}/info`)}
            style={{backgroundColor: secondBgColor}} 
            className="w-full px-4 py-2 flex items-center justify-between"
        >
            <div className="flex items-center gap-2">
                <div style={{backgroundColor: habit.color}} className="w-6 h-6 rounded-sm"></div>
                <p style={{color: textColor}} className="text-base font-medium">{habit.name}</p>
            </div>
            <div className="flex items-center gap-3">
                {habit.logs.map((log) => (
                    <div
                        key={log.date}
                        style={{
                            backgroundColor:
                                habit.type === "Value"
                                    ? "transparent"
                                    : !log.isDone && !log.isSkip
                                        ? secondTextColor
                                        : "transparent",
                        }}
                        className="w-6 h-6 rounded-sm flex items-center justify-center"
                    >
                        {habit.type === "Value" ? (
                            <span style={{ color: habit.color }} className="text-base font-medium">
                                {log.value === null ? 0 : log.value}
                            </span>
                        ) : (
                            <>
                                {log.isDone && <TickIcon width={24} height={24} color={habit.color} />}
                                {log.isSkip && <CrossIcon width={24} height={24} color={habit.color} />}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}