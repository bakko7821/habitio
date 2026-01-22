import { getContrastColor } from "../../../utils/color";
import { getLastMonthsDays } from "../../../utils/date";
import type { HabitLog } from "../../../utils/types/habit";
import { secondTextColor } from "../../../utils/types/variables";
import type { RenderChartProps } from "./ChartComponent";

export const CalendarChart = ({ habit }: RenderChartProps) => {
  const logsMap = new Map<string, HabitLog>();
  habit?.logs?.forEach((log) => logsMap.set(log.date, log));

  const months = getLastMonthsDays(3);

  const formatDayNumber = (date: string): string => {
    return String(Number(date.split("-")[0]));
  };

  return (
    <div className="flex w-full h-[160px] gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
      {months.map((month) => (
        <div
          key={month.name}
          className="flex-shrink-0 w-[193px] flex flex-col gap-0.5"
        >
          <p
            style={{ color: secondTextColor }}
            className="capitalize text-sm font-medium"
          >
            {month.name}
          </p>

          <div className="flex flex-wrap gap-1">
            {month.days.map((day) => {
              const log = logsMap.get(day.date);

              let bgColor = "bg-stone-300";
              let inlineStyle: React.CSSProperties | undefined;

              if (log) {
                if (log.isDone) {
                  bgColor = "";
                  inlineStyle = { backgroundColor: habit?.color ?? "green" };
                } else if (log.isSkip) {
                  bgColor = "";
                  inlineStyle = { backgroundColor: secondTextColor };
                }
              }

              return (
                <div
                  key={day.date}
                  className={`flex rounded-sm items-center justify-center p-1 w-6 h-6 ${bgColor}`}
                  style={inlineStyle}
                >
                  <p style={{color: getContrastColor(habit?.color)}} className="text-xs font-medium">
                    {formatDayNumber(day.date)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
