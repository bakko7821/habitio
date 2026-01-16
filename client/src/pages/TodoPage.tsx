import { useNavigate, useParams } from "react-router-dom";
import { formatDayMonth, shiftDay } from "../utils/date";
import { ArrowIcon } from "../assets/icons";
import { NewTaskInput } from "../components/UI/Todo/NewTaskInput";
import { useState, useEffect } from "react";
import { ToDoTask } from "../components/UI/Todo/ToDoTask";
import { motion, AnimatePresence } from "framer-motion"; // библиотека для анимаций

export const TodoPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  const [displayDate, setDisplayDate] = useState(date);

  useEffect(() => {
    setDisplayDate(date);
  }, [date]);

  const [newTaskValue, setNewTaskValue] = useState("");

  const handleCreateNewTodoTask = () => {
    console.log(`NEW TODO: ${newTaskValue}`);
  };

  const todos = [
    { id: 0, title: "Купить масло", isDone: false },
    { id: 1, title: "Купить молоко", isDone: true },
    { id: 2, title: "Купить хлеб", isDone: false },
    { id: 3, title: "Купить собачку", isDone: true },
  ];

  return (
    <>
      <div className="w-full flex items-center justify-between p-4">
        <button
            onClick={() => navigate(`/todo/${shiftDay(`${date}`, -1)}`)}
        >
            <motion.div
                whileTap={{ scale: 0.8, rotate: -10 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <ArrowIcon />
            </motion.div>
        </button>

        {/* Анимация даты */}
        <AnimatePresence mode="wait">
          <motion.p
            key={displayDate} // ключ = date, чтобы при смене создавалась новая анимация
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base font-medium"
          >
            {formatDayMonth(`${displayDate}`)}
          </motion.p>
        </AnimatePresence>

        <button
            onClick={() => navigate(`/todo/${shiftDay(`${date}`, +1)}`)}
            className="scale-x-[-1]"
        >
            <motion.div
                whileTap={{ scale: 0.8, rotate: 10 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <ArrowIcon />
            </motion.div>
        </button>
      </div>

      <NewTaskInput
        value={newTaskValue}
        onChange={setNewTaskValue}
        onSubmit={handleCreateNewTodoTask}
      />

      <div className="flex flex-col">
        {todos.map((todo) => (
          <ToDoTask
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isDone={todo.isDone}
          />
        ))}
      </div>
    </>
  );
};
