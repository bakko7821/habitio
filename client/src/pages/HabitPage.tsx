import { disableColor, hintColor, secondaryBgColor, textColor } from "../types/variables"
import type { Habit } from "../types/types"
import { ArrowIcon} from "../assets/icons"
import { useEffect, useState } from "react"

export const HabitPage = () => {
    const [habits, setHabits] = useState<Habit[]>([])
    const userId = 1
    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/habits/all-habits/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!res.ok) throw new Error("Ошибка при загрузке привычек")
                const data: Habit[] = await res.json()
                setHabits(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchHabits()
    }, [userId])

    const toShortDay = (day: string) => day.slice(0, 3);

    const linkClass =
        "relative p-2 rounded-full transition-colors duration-300";

    const [activeHabitId, setActiveHabitId] = useState<number | null>(null);

    const getArrowButtonClass = (isActive: boolean) =>
        `${linkClass} ${isActive ? "arrow-button-active" : "arrow-button"}`;

    const openHabitContent = (id: number) => {
        setActiveHabitId(id)

    }

    return(
        <div className="flex flex-col gap-2 relative">
            {habits?.length > 0 ? (
                habits.map((habit) => (
                    <div
                        key={habit.id}
                        style={{ backgroundColor: secondaryBgColor }}
                        className="w-full rounded-2xl p-2 flex flex-col gap-2"
                    >
                        <div className="w-full flex justify-between">
                            <div className="flex justify-start items-center gap-3">
                                <div
                                    style={{ backgroundColor: `${habit.icon.color}4D` }}
                                    className="p-2 rounded-lg flex items-center justify-center"
                                >
                                    <img 
                                        src={habit.icon.url} 
                                        alt="Icon" 
                                        className="w-[28px] h-[28px]"
                                    />
                                </div>

                                <p className="font-sf text-xl font-medium leading-[1.3]">{habit.name}</p>
                            </div>
                            <button
                                onClick={() => openHabitContent(habit.id)}
                                className={getArrowButtonClass(activeHabitId === habit.id)}
                            >
                                <ArrowIcon />
                            </button>
                        </div>
                        <div className={activeHabitId === habit.id ? "flex gap-2" : "hidden"}>
                            <div className="w-full flex flex-col gap-1">
                                {habit.weeks.map((week) => (
                                    <div 
                                        key={week.name}
                                        className="flex items-center justify-start gap-2"
                                    >
                                        <p 
                                            style={{ color: textColor, opacity: 0.6}}
                                            className="w-[30px] font-sf text-xs font-regular leading-[1.5] uppercase"
                                        >
                                            {toShortDay(week.name)}
                                        </p>
                                        <div className="flex gap-1">
                                            {week.days.map((day) => (
                                                <div 
                                                    key={day.date}
                                                    style={{ backgroundColor: day.status ? habit.icon.color : disableColor }}
                                                    className="w-[18px] h-[18px] rounded-md">

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <p 
                        style={{ color: hintColor }}
                        className="font-sf text-base font-medium leading-[1.3] px-3">
                        У вас отсутсвтуют привычки.
                    </p>
                </>
            )}
        </div>
    )
}