import { api } from "./auth";

export const createNewTodo = async (title: string) => {
  const { data } = await api.post("/todos/new-todo-task", {
    name: title,
  });
  return data;
};

export const getAllTodosFromDate = async (date: string) => {
  const { data } = await api.get(`/todos/get-todo-task-from-date/${date}`);
  return data;
};

export const getTodoFromID = async (taskId: number) => {
    const { data } = await api.get(`/todos/get-todo-task-from-id/${taskId}`);

    return data;
}