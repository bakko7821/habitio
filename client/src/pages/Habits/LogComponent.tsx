import { CrossIcon, TickIcon } from "../../assets/icons";
import type { HabitLog, HabitProps } from "../../utils/types/habit";
import { secondTextColor, textColor } from "../../utils/types/variables";

interface LogComponentProps {
    borderColor?: boolean
    log: HabitLog,
    habit: HabitProps
}

export const LogComponent = ({borderColor,log, habit}: LogComponentProps) => {
    return (
        <div
            key={log.date}
            style={{
                border: borderColor ? `2px solid ${textColor}` : "none",
                backgroundColor:
                    habit.type === "Value"
                        ? "transparent"
                        : !log.isDone && !log.isSkip
                            ? secondTextColor
                            : "transparent",
                width:
                    habit.type === "Value"
                        ? "fit-content"
                        : "24px",
                padding:
                    habit.type === "Value"
                        ? "4px"
                        : "0px"
            }}
            className="h-6 rounded-sm flex items-center justify-center"
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
    )
}