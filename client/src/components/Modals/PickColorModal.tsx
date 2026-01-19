import { HexColorPicker } from "react-colorful";
import { bgColor, secondTextColor, textColor } from "../../utils/types/variables";
import { CrossIcon } from "../../assets/icons";

interface PickColorModalProps {
  color: string;
  onChange: (color: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const PickColorModal: React.FC<PickColorModalProps> = ({ color, onChange, onSave, onClose }) => {
  return (
    <div className="z-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white/50 backdrop-blur-md rounded-xl p-2 shadow-lg max-w-md w-[80vw] border border-white/40 flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
            <p 
                style={{ color: secondTextColor }}
                className="text-xl font-medium"
            >
                Pick Color
            </p>
            <button onClick={onClose}>
                <CrossIcon 
                    color={secondTextColor}/>
            </button>
        </div>
        <HexColorPicker 
            color={color} 
            onChange={onChange} 
            className="w-full" 
        />
        <button 
            onClick={onSave}
            style={{color: bgColor, backgroundColor: textColor}} 
            className=" p-2 w-full"
        >
            Save color
        </button>
      </div>
    </div>
  );
}
