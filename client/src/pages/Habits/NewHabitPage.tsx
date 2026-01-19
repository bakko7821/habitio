import React, { useState } from "react"
import { bgColor, secondBgColor, textColor } from "../../utils/types/variables"
import { PickColorModal } from "../../components/Modals/PickColorModal"
import { ArrowIcon } from "../../assets/icons"
import { createNewHabit } from "../../api/habits"
import { useNavigate } from "react-router-dom"

export const NewHabitPage = () => {
    const navigate = useNavigate()
    const [habitName, setHabitName] = useState('')
    const [habitColor, setHabitColor] = useState('')
    const [habitType, setHabitType] = useState('Checkbox')
    const [isPickColorModal, setIsPickColorModal] = useState(false);
    const [isPickTypeModal, setIsPickTypeModal] = useState(false);

    const habdleNewHabitFormSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        if (!habitName || !habitColor || !habitType) {
            alert("Заполните все поля");
            return;
        }

        await createNewHabit({
            name: habitName,
            color: habitColor,
            type: habitType
        });

        navigate('/')
    }

    return (
        <form action="submit" onSubmit={habdleNewHabitFormSubmit} className="p-4 w-full h-full flex flex-col items-center justify-between">
            <div className="w-full flex flex-col gap-2">
                <div style={{backgroundColor: secondBgColor}} className="floating-input">
                    <input 
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        type="text" 
                        name="name"
                        id="name"
                        placeholder="Push-ups"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="w-full flex gap-2">
                    <div style={{backgroundColor: secondBgColor}} className="floating-input">
                        <input 
                            value={habitColor}
                            onChange={(e) => setHabitColor(e.target.value)}
                            type="text" 
                            name="color"
                            id="color"
                            placeholder="#FF4011"/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div 
                        onClick={() => setIsPickColorModal(true)}
                        style={{ backgroundColor: habitColor || textColor }} 
                        className="pointer h-full aspect-square">
                    </div>
                    {!isPickColorModal ? null : (
                        <PickColorModal 
                            color={habitColor}
                            onChange={setHabitColor}
                            onSave={() => {
                                setIsPickColorModal(false)
                            }}
                            onClose={() => {
                                setIsPickColorModal(false)
                            }} />
                    )}
                </div>
                <div style={{backgroundColor: secondBgColor}} className="floating-input reative">
                    <div className="px-1 w-full flex items-center justify-between">
                        <p className="font-medium">{habitType}</p>
                        <button 
                            onClick={() => setIsPickTypeModal(prev => !prev)}
                            type="button"
                            className={!isPickTypeModal ? "rotate-[270deg]" : "rotate-[90deg]"}
                        >
                            <ArrowIcon />
                        </button>
                        {!isPickTypeModal ? null : (
                            <div style={{backgroundColor: secondBgColor}} className="p-2 absolute top-full right-0">
                                <p
                                    onClick={() => {
                                        setHabitType('Checkbox')
                                        setIsPickTypeModal(false)}}
                                    className={`p-1 font-medium text-sm ${
                                    habitType === "Checkbox" ? "text-red-500" : "text-gray-700"
                                    }`}
                                >
                                    Checkbox
                                </p>
                                <p  
                                    onClick={() => {
                                        setHabitType('Value')
                                        setIsPickTypeModal(false)}}
                                    className={`p-1 font-medium text-sm ${
                                    habitType === "Value" ? "text-red-500" : "text-gray-700"
                                    }`}
                                >
                                    Value
                                </p>
                            </div>
                        )}
                    </div>
                    <input type="hidden" />
                    <label htmlFor="color">Type</label>
                </div>
            </div>
            <button 
                style={{ backgroundColor: textColor, color: bgColor}} 
                className="p-3 w-full text-xl font-medium"
                type="submit"
            >
                Create new Habit
            </button>
        </form>
    )
}