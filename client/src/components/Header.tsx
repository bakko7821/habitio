import { useState } from "react";
import { BurgerMenuIcon, EditIcon } from "../assets/icons";
import { NavigationMenu } from "./UI/NavigationMenu";
import { secondTextColor, textColor } from "../utils/types/variables.ts";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  isOpenHabitInfo?: boolean;
  title: string;
}

export const Header = ({ isOpenHabitInfo, title }: HeaderProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <header className="relative w-full flex items-center justify-between p-4">
      <p className="text-2xl font-semibold">{title}</p>

      <div className="flex gap-1 items-center justify-center">
        {!isOpenHabitInfo ? null : (
          <button onClick={() => console.log('click')}>
            <motion.div
              whileTap={{ scale: 0.8, rotate: 10 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <EditIcon width={32} height={32} color={secondTextColor}/>
            </motion.div>
          </button>
        )}
        <button onClick={() => setIsNavigationOpen(true)}>
          <motion.div
            whileTap={{ scale: 0.8, rotate: 10 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BurgerMenuIcon width={32} height={32} color={textColor} />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isNavigationOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-[40vw] z-50"
          >
            <NavigationMenu onClose={() => setIsNavigationOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
