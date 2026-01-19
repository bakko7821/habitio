import { api } from "./auth"

export const createNewHabit = async () => {
    
}

export const getAllHabit = async () => {
    const { data } = await api.get("/habit/get-all-habits");

    return data;
}