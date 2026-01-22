import type { HabitProps } from "../../utils/types/habit"

interface EditDayHabitModalProps {
    habit: HabitProps,
    onClose: () => void;
}
export const EditDayHabitModal = ({habit, onClose}: EditDayHabitModalProps) => {
    return (
        <div onClick={onClose} className="z-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <div className="bg-white/50 backdrop-blur-md rounded-xl p-2 shadow-lg max-w-md w-[80vw] border border-white/40 flex flex-col gap-2">
                
              </div>
        </div>
    )
}