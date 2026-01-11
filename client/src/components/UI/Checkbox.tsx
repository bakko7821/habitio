import { useState } from "react"
import { MoreIcon } from "../../assets/icons"
import type { CheckboxProps } from "../../types/types"
import { buttonColor, hintColor } from "../../types/variables"
import { EditToDoTaskModal } from "../Modal/EditToDoTaskModal"

export const Checkbox = ({
    task,
    checked,
    onChange,
    disabled = false,
}: CheckboxProps) => {
    const [isOpenEditTask, setIsOpenEditTask] = useState(false)

    return (
        <label
            className={`flex items-center gap-2 cursor-pointer select-none
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >
            {/* hidden input */}
            <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            />

            {/* custom checkbox */}
            <div
            style={{
                backgroundColor: checked ? buttonColor : "transparent",
                borderColor: checked
                ? buttonColor
                : hintColor,
            }}
            className={`
                w-5 h-5 rounded-md border-2 flex items-center justify-center
                transition-all duration-200
            `}
            >
            {/* check icon */}
            <svg
                className={`w-3 h-3 text-white transition-opacity duration-200
                ${checked ? "opacity-100" : "opacity-0"}
                `}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
            </div>

            {task.name && <span className="text-base w-full">{task.name}</span>}

            <button 
                onClick={() => setIsOpenEditTask(true)}
                type="button"
                className="opacity-[0.6]">
                <MoreIcon />
            </button>
            {isOpenEditTask && (
                <EditToDoTaskModal 
                    task={task}
                    onClose={
                        () => setIsOpenEditTask(false)
                    }
                />
            )}
        </label>
    )
}
