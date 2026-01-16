import { useState } from "react";
import { ArrowIcon } from "../../../assets/icons";
import type { KanbanCardProps } from "../../../utils/types/kanban";
import { secondBgColor } from "../../../utils/types/variables";
import { KanbanTask } from "./KanbanTask";
import { motion, AnimatePresence } from "framer-motion";

export const KanbanCard = ({ title, tasks }: KanbanCardProps) => {
  const [cardIsOpen, setCardIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        style={{ backgroundColor: secondBgColor }}
        onClick={() => setCardIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4"
      >
        <p className="">{title}</p>

        <motion.button
          animate={{ rotate: cardIsOpen ? 90 : 270 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowIcon />
        </motion.button>
      </div>

      <AnimatePresence>
        {cardIsOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {tasks.map((task) => (
              <KanbanTask
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                tags={task.tags}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
