import { NavLink } from "react-router-dom";
import { CrossIcon, LogOutIcon } from "../../assets/icons";
import { textColor } from "../../utils/types/variables";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface NavigationMenuProps {
  onClose: () => void;
}

export const NavigationMenu = ({ onClose }: NavigationMenuProps) => {
  const languageMap: Record<string, string> = {
    ru: "🇷🇺",
    en: "🇺🇸",
    de: "🇩🇪",
    fr: "🇫🇷",
  };

  const shortLang = navigator.language.slice(0, 2); // "ru" / "en"
  const flag = languageMap[shortLang] || "🌐";

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.05, type: "spring", stiffness: 300, damping: 20 },
    }),
  };


  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.nav
          className="flex flex-col items-start justify-between z-50 top-0 right-0 fixed bg-white/30 backdrop-blur-md p-4 shadow-lg h-screen w-[40vw]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ссылки */}
          <div className="flex flex-col gap-3">
            {["/habits", "/todo", "/kanban", "/matrix"].map((path, i) => (
              <motion.div
                key={path}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink className="capitalize" to={path}>{path.replace("/", "")}</NavLink>
              </motion.div>
            ))}
          </div>

          {/* Кнопка закрытия */}
          <button className="absolute right-4 top-4" onClick={onClose}>
            <motion.div
              whileTap={{ scale: 0.8, rotate: 10 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CrossIcon color={textColor} />
            </motion.div>
          </button>

          {/* Кнопка выхода и язык */}
          <div className="w-full flex items-center justify-end gap-2 mt-auto">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <LogOutIcon />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {flag}
            </motion.button>
          </div>
        </motion.nav>
      </motion.div>
    </AnimatePresence>
  );
};
