import { useNavigate, useParams } from "react-router-dom";
import { formatDayMonth, shiftDay } from "../utils/date";
import { ArrowIcon } from "../assets/icons";
import { NewTaskInput } from "../components/UI/Todo/NewTaskInput";
import { useState, useEffect } from "react";
import { ToDoTask } from "../components/UI/Todo/ToDoTask";
import { motion, AnimatePresence } from "framer-motion"; // библиотека для анимаций
import { type TodoTaskProps } from "../utils/types/todo";
import { createNewTodo, getAllTodosFromDate } from "../api/todos";

export const TodoPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  const [displayDate, setDisplayDate] = useState(date);
  const [todos, setTodos] = useState<TodoTaskProps[]>([])
  const [loading, setLoading] = useState(true)
  const [newTaskValue, setNewTaskValue] = useState("");


  useEffect(() => {
    setDisplayDate(date);
  }, [date]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getAllTodosFromDate(`${date}-2026`);
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [date]);

  const handleCreateNewTodoTask = async () => {
    if (!newTaskValue.trim()) {
      alert('Поле не должно быть пустым');
      return;
    }

    try {
      const newTodo = await createNewTodo(newTaskValue);

      setTodos(prev => [...prev, newTodo]);
      setNewTaskValue('');
    } catch (e) {
      console.error(e);
    }
  };
  
  if (loading) {
    return <div className="px-4 py-2">Загрузка...</div>;
  }

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
            date={todo.date}          
          />
        ))}
      </div>
    </>
  );
};
