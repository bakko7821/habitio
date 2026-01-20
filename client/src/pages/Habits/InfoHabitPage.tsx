import { useParams } from "react-router-dom"
import { ChartComponent } from "../../components/UI/Chart/ChartComponent"
import { CalendarChart } from "../../components/UI/Chart/CalendarChart"
import { ResultChart } from "../../components/UI/Chart/ResultChart"
import { StreakChart } from "../../components/UI/Chart/StreakChart"
import { useEffect, useState } from "react"
import { type HabitProps } from "../../utils/types/habit"
import { getHabitFromID } from "../../api/habits"
import { bgColor, textColor } from "../../utils/types/variables"

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
            <div style={{backgroundColor: habit?.color}} className="p-4 flex items-center justify-center">
                <p style={{backgroundColor: bgColor, color: textColor}} className="px-2 text-xl font-medium">{habit?.name}</p>
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