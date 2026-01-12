export interface HeaderProps {
    title: string;
    showHabitButton?: boolean
}

export interface IconsModalProps {
    onSelect: (iconUrl: string) => void;
    onClose: () => void;
}

export interface ChangeDaySuccesModalProps {
    habit: Habit;
    day: HabitDay;
    onClose: () => void;
}

export interface ColorsModalProps {
    onSelect: (color: string) => void;
    onClose: () => void;
}

export interface EditHabitModalProps {
    habit: Habit  
    onClose: () => void;
}

export interface EditToDoTaskModalProps {
    task: TodoTask;
    onClose: () => void;
}

export interface CheckboxProps {
    task: TodoTask;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

// ToDo interfaces

export interface TodoTask {
  id: number
  name: string
  checked: boolean
}

export interface TodoDay {
  date: string // ISO YYYY-MM-DD
  tasks: TodoTask[]
}


// Habit interfaces

export interface Habit {
    id: number;
    name: string;
    icon: HabitIcon;
    weeks: HabitWeek[];
}

export interface HabitIcon {
    id: number;
    url: string;
    color: string;
}

export interface HabitWeek {
    name: string;
    days: HabitDay[]
}

export interface HabitDay {
    id: number;
    date: string;
    status: boolean;
    value?: number;
}