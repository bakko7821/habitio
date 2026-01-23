import { HexColorPicker } from "react-colorful";
import { bgColor, secondBgColor, secondTextColor, textColor } from "../../utils/types/variables";
import { CrossIcon, MinusIcon, TickIcon } from "../../assets/icons";
import type { HabitProps } from "../../utils/types/habit";

interface EditDayHabitModalProps {
  habit: HabitProps | undefined,
  day: string;
  onSave: () => void;
  onClose: () => void;
}

export const EditDayHabitModal: React.FC<EditDayHabitModalProps> = ({ habit, day, onSave, onClose }) => {
  return (
    <div onClick={onClose} className="z-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white/50 backdrop-blur-md rounded-xl p-2 shadow-lg max-w-md border border-white/40 flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
            <p 
                style={{ color: secondTextColor }}
                className="text-xl font-medium"
            >
                Edit {day}
            </p>
        </div>
        <div className="flex gap-2 items-center justify-around w-full">
            {habit?.type === "Value" ? (
                <>
                    <input type="number" value={0} />
                    <button>Save</button>
                    <button>Skip</button>
                </>
            ) : (
                <>
                    <button 
                        style={{backgroundColor: secondBgColor}}
                        type="button" 
                        className="p-1 rounded-sm"
                    >
                        <TickIcon 
                            width={36}
                            height={36}
                            color={habit?.color}/>
                    </button>
                    <button 
                        style={{backgroundColor: secondBgColor}}
                        type="button" 
                        className="p-1 rounded-sm"
                    >
                        <MinusIcon 
                            width={36}
                            height={36}
                            color={habit?.color}/>
                    </button>
                    <button 
                        style={{backgroundColor: secondBgColor}}
                        onClick={onClose} 
                        type="button" 
                        className="p-1 rounded-sm"
                    >
                        <CrossIcon 
                            width={36}
                            height={36}
                            color={secondTextColor}/>
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
}
