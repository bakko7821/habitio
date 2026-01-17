import { useEffect, useState, type ReactNode } from "react";
import { ArrowIcon } from "../../../assets/icons";
import { secondBgColor, textColor } from "../../../utils/types/variables";
import { motion, AnimatePresence } from "framer-motion";
import type { HabitProps } from "../../../utils/types/habit";

interface ChartComponentProps {
  title: string;
  isHaveMenu?: boolean;
  menuParams?: MenuParamsProps[];
  selectedParams?: MenuParamsProps;
  content: ReactNode;
}

interface MenuParamsProps {
  name: string;
  isActive: boolean;
}

export interface RenderChartProps {
    habit: HabitProps | undefined;
}

export const ChartComponent = ({
  title,
  isHaveMenu,
  menuParams,
  selectedParams,
  content,
}: ChartComponentProps) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectedParam, setSelectedParam] =
    useState<MenuParamsProps | undefined>(undefined);

  useEffect(() => {
    setSelectedParam(selectedParams);
  }, [selectedParams]);

  return (
    <div className="flex flex-col gap-2 items-start justify-start">
      <div
        style={{ backgroundColor: secondBgColor, color: textColor }}
        className="p-4 w-full text-xl font-medium relative"
      >
        {title}

        {!isHaveMenu ? null : (
          <div className="absolute top-3.5 right-4 z-48">
            {/* Кнопка + выбранное значение */}
            <motion.div
              className="flex justify-between items-center gap-1 cursor-pointer min-w-25"
              onClick={() => setIsOpenDropDown((prev) => !prev)}
            >
              <p className="text-base p-2">{selectedParam?.name}</p>

              <motion.div
                animate={{ rotate: isOpenDropDown ? 90 : 270 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ArrowIcon width={28} height={28} color={textColor} />
              </motion.div>
            </motion.div>

            {/* Dropdown */}
            <AnimatePresence>
              {isOpenDropDown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="
                    mt-[5px] flex flex-col gap-1
                    bg-white/30 backdrop-blur-md shadow-lg min-w-25
                  "
                >
                  {menuParams?.map(
                    (menuParam) =>
                      menuParam.isActive && (
                        <motion.p
                          key={menuParam.name}
                          onClick={() => {
                            setSelectedParam(menuParam);
                            setIsOpenDropDown(false);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="
                            text-base p-2 cursor-pointer
                            hover:bg-white/30
                          "
                        >
                          {menuParam.name}
                        </motion.p>
                      )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className={!isHaveMenu ? "px-4 py-2" : "px-4 py-2 min-h-40"}>
        {content}
      </div>
    </div>
  );
};
