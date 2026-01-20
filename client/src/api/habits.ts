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