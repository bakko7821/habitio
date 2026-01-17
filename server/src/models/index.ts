// src/models/index.ts
import { User } from "./User";
import { Habit } from "./Habit";
import { HabitLog } from "./HabitLog";
import { Kanban } from "./Kanban";
import { Task } from "./Task";
import { Tag } from "./Tag";

// === HABITS ===
Habit.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Habit, { foreignKey: "ownerId" });

HabitLog.belongsTo(Habit, { foreignKey: "habitId" });
Habit.hasMany(HabitLog, { foreignKey: "habitId" });

// === KANBAN ===
Kanban.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Kanban, { foreignKey: "ownerId" });

Task.belongsTo(Kanban, { foreignKey: "kanbanId" });
Kanban.hasMany(Task, { foreignKey: "kanbanId" });

// === TASK TAGS ===
Task.belongsToMany(Tag, { through: "TaskTags" });
Tag.belongsToMany(Task, { through: "TaskTags" });

// Экспортируем все модели, чтобы их можно было использовать в роутерах
export { User, Habit, HabitLog, Kanban, Task, Tag };
