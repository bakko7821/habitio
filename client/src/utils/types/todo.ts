export interface CreateTodoDTO {
    title: string;
}

export interface TodoTaskProps {
    id: number;
    date: string;
    title: string;
    isDone: boolean;
}