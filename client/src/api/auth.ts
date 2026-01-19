import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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