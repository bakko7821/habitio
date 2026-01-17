import { PlusIcon } from "../assets/icons"
import { Habit } from "../components/UI/Habit/Habit"
import type { HabitProps } from "../utils/types/habit"
import { secondTextColor } from "../utils/types/variables"

const HabitsList: HabitProps[] = [
    {id: 0, name: 'Отжимания', color: '#FF0000', type: 'boolean'},
    {id: 1, name: 'Книги', color: '#0C763C', type: 'boolean'},
    {id: 2, name: 'Программирование', color: '#0900FF', type: 'boolean'},
]

export const HabitPage = () => {
    return (
        <>
            <div className="w-full px-4 py-1">
                <PlusIcon width={24} height={24} color={secondTextColor}/>
            </div>
            <div className="flex flex-col gap-1">
                {HabitsList.map((habit) => (
                    <Habit habit={habit} />
                ))}
            </div>
        </>
    )
}