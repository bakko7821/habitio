import { getLastMonthsDays } from "../../../utils/date";
import { secondTextColor } from "../../../utils/types/variables";
import type { RenderChartProps } from "./ChartComponent";

export const CalendarChart = ({habit}: RenderChartProps) => {
    const months = getLastMonthsDays(3)

    const formatDayNumber = (date: string): string => {
        return String(Number(date.split("-")[0]));
    };

    return (
        <div className="flex w-full h-[160px] gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
                {months.map((month) => (
                    <div className="flex-shrink-0 w-[193px] flex flex-col gap-0.5">
                        <p 
                            style={{color: secondTextColor}} 
                            className="capitalize text-sm font-medium">{month.name}</p>
                        <div className="flex flex-wrap gap-1">
                            {month.days.map((day) => (
                                <div
                                    key={day.date} 
                                    className="bg-stone-300 flex rounded-sm items-center justify-center p-1 w-6 h-6"
                                >
                                    <p className="text-xs font-medium">{formatDayNumber(day.date)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}