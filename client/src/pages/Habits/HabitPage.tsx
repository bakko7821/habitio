import { useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons";
import { Habit } from "../../components/UI/Habit/Habit";
import type { HabitProps } from "../../utils/types/habit";
import { secondTextColor } from "../../utils/types/variables";
import { getAllHabit } from "../../api/habits";
import { NavLink } from "react-router-dom";
import { getLastDays } from "../../utils/date";

export const HabitPage = () => {
  const [habitList, setHabitList] = useState<HabitProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const data = await getAllHabit();
        setHabitList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, []);

  if (loading) {
    return <div className="px-4 py-2">Загрузка...</div>;
  }

  const days = getLastDays(4);

  return (
    <>
        <div className="w-full px-4 py-1 flex items-center justify-between">
          <NavLink to={"/new-habit"}><PlusIcon width={24} height={24} color={secondTextColor} /></NavLink>
          <div className="flex items-center gap-3">
            {days.map((day) => (
              <div className="min-w-[24px] flex flex-col items-center gap-0" key={day.fullDate}>
                <p style={{color: secondTextColor}} className="leading-none text-xs font-medium">{day.number}</p>
                <p style={{color: secondTextColor}} className="leading-none text-xs font-medium">{day.name.slice(0, 3)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
            {habitList.length > 0 ? (
                habitList.map((habit) => (
                <Habit key={habit.id} habit={habit} />
                ))
            ) : (
                <p style={{color: secondTextColor}} className="px-4 font-medium">У вас отсутствуют привычки.</p>
            )}
        </div>
    </>
  );
};
