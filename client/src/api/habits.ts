import type { CreateHabitDTO } from "../utils/types/habit";
import { api } from "./auth"

export const createNewHabit = async (habit: CreateHabitDTO) => {
  const { data } = await api.post("/habit/new-habit", habit);
  return data;
};

export const getAllHabit = async () => {
    const { data } = await api.get("/habit/get-all-habits");

    return data;
}