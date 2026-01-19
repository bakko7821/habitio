import { useEffect, useState } from "react";
import { PlusIcon } from "../assets/icons";
import { Habit } from "../components/UI/Habit/Habit";
import type { HabitProps } from "../utils/types/habit";
import { secondTextColor } from "../utils/types/variables";
import { getAllHabit } from "../api/habits";
import { NavLink } from "react-router-dom";

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

  return (
    <>
        <div className="w-full px-4 py-1">
            <NavLink to={"/new-habit"}><PlusIcon width={24} height={24} color={secondTextColor} /></NavLink>
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
