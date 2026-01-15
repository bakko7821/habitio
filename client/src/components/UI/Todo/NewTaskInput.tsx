import { useState } from "react"
import { CrossIcon, PlusIcon } from "../../../assets/icons"
import { secondBgColor, secondTextColor } from "../../../utils/types/variables"

export const NewTaskInput = () => {
    const [isInputActive, setIsInputActive] = useState(false)
    const [todoValue, setTodoValue] = useState('')

    return (
        <div style={{backgroundColor: secondBgColor}} className="w-full flex items-center justify-start p-4">
            {!isInputActive ? (
                <div 
                    onClick={() => setIsInputActive(true)}
                    className="flex gap-2"
                >
                    <PlusIcon color={secondTextColor} />
                    <p style={{ color: secondTextColor }} className="text-base font-medium">Новая задача</p>
                </div>
            ) : (
                <div className="w-full flex items-center justify-between">
                    <input 
                        type="text" 
                        value={todoValue}
                        onChange={(e) => setTodoValue(e.target.value)}
                        placeholder="Купить хлеб"
                    />
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={() => console.log(todoValue)}
                            className=""
                        >
                            <PlusIcon color={secondTextColor} />
                        </button>
                        <button 
                            onClick={() => setIsInputActive(false)}
                            className=""
                        >
                            <CrossIcon color={secondTextColor} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}