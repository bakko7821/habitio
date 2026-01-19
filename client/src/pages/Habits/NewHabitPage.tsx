import { useState } from "react"
import { secondBgColor, textColor } from "../../utils/types/variables"
import { PickColorModal } from "../../components/Modals/PickColorModal"

export const NewHabitPage = () => {
    const [habitName, setHabitName] = useState('')
    const [habitColor, setHabitColor] = useState('')
    const [isPickColorModal, setIsPickColorModal] = useState(false);

    return (
        <form action="" className="p-4 w-full h-full flex flex-col items-center justify-between">
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
            </div>
            <button type="submit">Create new Habit</button>
        </form>
    )
}