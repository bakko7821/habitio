import type { CreateHabitDTO } from "../utils/types/habit";
import { api } from "./auth"

export const createNewHabit = async (habit: CreateHabitDTO) => {
  const { data } = await api.post("/habits/new-habit", habit);
  return data;
};

export const getAllHabit = async () => {
    const { data } = await api.get("/habits/get-all-habits");

    return data;
}

export const getHabitFromID = async (habitId: number) => {
    const { data } = await api.get(`/habits/get-habit-from-id/${habitId}`);

    return data;
}

export const deleteHabitFromID = async (habitId: number) => {
    const { data } = await api.get(`/habits/delete-habit-from-id/${habitId}`);

    return data;
}

