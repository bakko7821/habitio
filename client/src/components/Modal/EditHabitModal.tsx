/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { CrossIcon } from "../../assets/icons";
import type { EditHabitModalProps } from "../../types/types";
import { buttonColor, buttonTextColor, textColor } from "../../types/variables";

export const EditHabitModal = ({habit, onClose}: EditHabitModalProps) => {

    const [habitName, setHabitName] = useState('')
    const [habitTime, setHabitTime] = useState('')
    const [habitNotes, setHabitNotes] = useState('')

    useEffect(() => {
        setHabitName(habit.name)
    }, [])

    return (
        <div className="modal fixed inset-0 z-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xs" />
                <div
                    className="pickIconContent relative overflow-y-scroll z-10 w-[85vw] h-[60vh] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/50 shadow-xl p-3 gap-3 flex flex-col"
                >
                    <div className="w-full flex items-center justify-between">
                        <p style={{ color: textColor }}
                            className="text-base font-medium"
                        >
                            {habit.name}
                        </p>
                        <button 
                            style={{ color: textColor }}
                            type="button"
                            className="close p-1"
                            onClick={onClose}
                        >
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex gap-4">
                            <div className="floating-input w-full">
                                <input 
                                    required
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    placeholder="Название"
                                    value={habitName}
                                    onChange={(e) => setHabitName(e.target.value)}/>
                                <label htmlFor="name">Название <span>*</span></label>
                            </div>
                        </div>
                        <div className="floating-input">
                            <select 
                                required
                                id="habit-type">
                                <option value="everyday">Каждый день</option>
                                <option value="one-three-day">Раз в 3 дня</option>
                                <option value="one-on-week">Раз в неделю</option>
                            </select>
                            <label htmlFor="habit-type">Частота <span>*</span></label>
                        </div>
                        <div className="floating-input w-full">
                            <input 
                                type="time" 
                                name="time" 
                                id="time"
                                placeholder="Напоминание"
                                value={habitTime}
                                onChange={(e) => setHabitTime(e.target.value)}/>
                            <label htmlFor="time">Напоминание</label>
                        </div>
                        <div className="floating-input w-full">
                            <input 
                                type="text" 
                                name="notes" 
                                id="notes"
                                placeholder="Заметки"
                                value={habitNotes}
                                onChange={(e) => setHabitNotes(e.target.value)}/>
                            <label htmlFor="notes">Заметки</label>
                        </div>

                        <button 
                            style={{ backgroundColor: buttonColor, color: buttonTextColor}}
                            className="text-base font-medium leading-[1.5] w-full rounded-xl p-3"
                        >Сохранить</button>
                    </div>
                </div>
        </div>
    )
}