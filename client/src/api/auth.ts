import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const { data } = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return data;
};

export const login = async (
    username: string,
    password: string
) => {
    const {data} = await api.post("/auth/login", {
        username,
        password
    })

    return data
}