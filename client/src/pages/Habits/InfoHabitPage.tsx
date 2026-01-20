import { useParams } from "react-router-dom"
import { ChartComponent } from "../../components/UI/Chart/ChartComponent"
import { CalendarChart } from "../../components/UI/Chart/CalendarChart"
import { ResultChart } from "../../components/UI/Chart/ResultChart"
import { StreakChart } from "../../components/UI/Chart/StreakChart"
import { useEffect, useState } from "react"
import { type HabitProps } from "../../utils/types/habit"
import { getHabitFromID } from "../../api/habits"
import { getContrastColor } from "../../utils/color"
import { motion } from "framer-motion";
import { EditIcon, TrashIcon } from "../../assets/icons"
import { LogComponent } from "./LogComponent"

export const InfoHabitPage = () => {
    const {id} = useParams()

    const [habit, setHabit] = useState<HabitProps | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHabitInfo = async () => {
            try {
                const data = await getHabitFromID(Number(id));
                setHabit(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadHabitInfo();
    }, []);

    if (loading) {
        return <div className="px-4 py-2">Загрузка...</div>;
    }

    return (
        <>
            <div
                style={{ backgroundColor: habit?.color }}
                className="p-4 flex items-center justify-between"
            >
                <p
                    style={{
                        color: getContrastColor(habit?.color)
                    }}
                    className="text-xl font-medium"
                >
                    {habit?.name}
                </p>
                <div className="flex items-center gap-2">
                    <button onClick={() => console.log('edit click')}>
                        <motion.div
                            whileTap={{ scale: 0.8, rotate: 10 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <EditIcon width={32} height={32} color={getContrastColor(habit?.color)} />
                        </motion.div>
                    </button>
                    <button onClick={() => console.log('trash click')}>
                        <motion.div
                            whileTap={{ scale: 0.8, rotate: 10 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <TrashIcon width={32} height={32} color={getContrastColor(habit?.color)} />
                        </motion.div>
                    </button>
                </div>
            </div>
            <div className="px-4 flex items-center justify-start gap-2">
                {habit?.logs.map((log) => (
                    <LogComponent borderColor={true} log={log} habit={habit} />
                ))}
            </div>
            <ChartComponent 
                title={"Best streak"} 
                isHaveMenu={false}
                content={<StreakChart habit={undefined} />}
            />
            <ChartComponent 
                title={"Result"}
                isHaveMenu={true}
                menuParams={[
                    {name: 'Week', isActive: true},
                    {name: 'Month', isActive: true},
                    {name: 'Quarter', isActive: true},
                    {name: 'Year', isActive: true},
                ]}
                selectedParams={
                    {name: 'Week', isActive: true}
                }
                content={<ResultChart habit={undefined} />}
            />
            <ChartComponent 
                title={"Calendar"}
                isHaveMenu={true}
                menuParams={[
                    {name: 'Week', isActive: true},
                    {name: 'Month', isActive: true},
                    {name: 'Quarter', isActive: true},
                ]}
                selectedParams={
                    {name: 'Week', isActive: true}
                }
                content={<CalendarChart habit={undefined} />}
            />
        </>
    )
}