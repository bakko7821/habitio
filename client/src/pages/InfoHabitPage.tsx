import { useParams } from "react-router-dom"
import { ChartComponent } from "../components/UI/Chart/ChartComponent"
import { CalendarChart } from "../components/UI/Chart/CalendarChart"
import { ResultChart } from "../components/UI/Chart/ResultChart"
import { StreakChart } from "../components/UI/Chart/StreakChart"

export const InfoHabitPage = () => {
    const {id} = useParams()

    return (
        <>
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