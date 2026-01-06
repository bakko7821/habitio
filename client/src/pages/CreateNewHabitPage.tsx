import { useState } from "react"
import { buttonColor, buttonTextColor } from "../types/variables"
import { useNavigate } from "react-router-dom"

export const CreateNewHabitPage = () => {
    const navigate = useNavigate()

    const [habitName, setHabitName] = useState('')
    const [habitColor, setHabitColor] = useState('')
    const [habitTime, setHabitTime] = useState('')
    const [habitNotes, setHabitNotes] = useState('')

    const handleSubmitNewHabitForm = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            user_id: 1,
            name: habitName,
            color: habitColor
        }

        try {
            const res = await fetch("http://localhost:5000/api/habits/new-habit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            const data = await res.json()
            console.log("Created habit:", data)
        } catch (err) {
            console.error(err)
        }

        navigate("/habit")
    }

    return (
        <form 
            action="submit"
            onSubmit={handleSubmitNewHabitForm}
            className="w-full flex-1 px-[12px] flex flex-col justify-between items-center"
        >
            <div className="w-full flex flex-col gap-4 relative">
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
                    <div className="floating-input">
                        <input 
                            required
                            type="color" 
                            name="color" 
                            id="color"
                            placeholder="Цвет"
                            value={habitColor}
                            onChange={(e) => setHabitColor(e.target.value)}/>
                        <label htmlFor="color">Цвет <span>*</span></label>
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
            </div>
            <button
                type="submit"
                style={{backgroundColor: buttonColor, color: buttonTextColor}}
                className="w-full p-3 rounded-2xl flex items-center justify-center font-medium text-base"
            >
                Создать
            </button>
        </form>
    )
}