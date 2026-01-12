import { useState } from "react"
import { CrossIcon } from "../../assets/icons"
import type { ChangeDaySuccesModalProps } from "../../types/types"
import { buttonColor, buttonTextColor, hintColor, textColor } from "../../types/variables"

export const ChangeDaySuccesModal = ({habit, day, onClose}: ChangeDaySuccesModalProps) => {
    const [habitNotes, setHabitNotes] = useState('')

    async function handleSetTrueDay() {
        await fetch(`http://localhost:5000/api/habit-logs/${day.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: true,
            }),
        })

        onClose()
    }

    async function handleSetFalseDay() {
        await fetch(`http://localhost:5000/api/habit-logs/${day.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: false,
            }),
        })

        onClose()
    }

    return (
        <div className="modal fixed inset-0 z-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xs" onClick={onClose}/>
                <div
                    className="pickIconContent relative overflow-y-scroll z-10 w-[85vw] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/50 shadow-xl p-3 gap-4 flex flex-col"
                >   
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <p 
                                style={{ color: textColor}}
                                className="text-base font-medium"
                            >{habit.name}</p>
                            <p
                                style={{ color: hintColor }} 
                                className="text-base font-medium"
                            >{day.date}</p>
                        </div>
                        <button
                            style={{ color: textColor }}
                            onClick={onClose}
                            type="button"
                            className="close p-1"
                        >
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="floating-input w-full">
                        <input 
                            type="text" 
                            name="notes" 
                            id="notes"
                            placeholder="Заметки"
                            value={habitNotes}
                            onChange={(e) => setHabitNotes(e.target.value)}/>
                        <label htmlFor="notes">Заметка</label>
                    </div>
                    <div className="flex w-full gap-2 items-center">
                        <button
                            onClick={() => handleSetTrueDay()} 
                            style={{backgroundColor: buttonColor, color: buttonTextColor}}
                            className="font-medium w-full flex items-center justify-center p-3 rounded-xl">
                            Выполнил
                        </button>
                        <button 
                            onClick={() => handleSetFalseDay()} 
                            style={{backgroundColor: hintColor, color: buttonTextColor}}
                            className="font-medium flex items-center justify-center px-7 p-3 rounded-xl">
                            Skip
                        </button>
                    </div>
                </div>
        </div>
    )
}