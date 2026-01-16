import { useState } from "react";
import { CrossIcon, PlusIcon } from "../../../assets/icons";
import { secondBgColor, secondTextColor } from "../../../utils/types/variables";
import { motion, AnimatePresence } from "framer-motion";

interface NewTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const NewTaskInput = ({ value, onChange, onSubmit }: NewTaskInputProps) => {
  const [isInputActive, setIsInputActive] = useState(false);

  return (
    <div
      style={{ backgroundColor: secondBgColor }}
      className="w-full flex items-center justify-start p-4"
    >
      <AnimatePresence mode="wait">
        {!isInputActive ? (
          <motion.div
            key="preview"
            onClick={() => setIsInputActive(true)}
            className="flex gap-2 cursor-pointer w-full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PlusIcon color={secondTextColor} />
            <p style={{ color: secondTextColor }} className="text-base font-medium">
              Новая задача
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            className="w-full flex items-center justify-between"
            initial={{ opacity: 0, scale: 0.95, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Купить хлеб"
              className="flex-1"
            />
            <div className="flex items-center justify-center gap-2 ml-2">
              <motion.button
                onClick={onSubmit}
                whileTap={{ scale: 0.8 }}
              >
                <PlusIcon color={secondTextColor} />
              </motion.button>
              <motion.button
                onClick={() => setIsInputActive(false)}
                whileTap={{ scale: 0.8 }}
              >
                <CrossIcon color={secondTextColor} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
