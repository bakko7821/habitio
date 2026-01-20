export interface CreateHabitDTO {
    name: string
    color: string
    type: string
}

export interface HabitProps {
    id: number;
    name: string;
    color: string;
    type: string;
    logs: HabitLog[];
}

export interface HabitLog {
    date: string;
    value?: number;
    isDone?: boolean;
    isSkip?: boolean;
}