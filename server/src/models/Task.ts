import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Kanban } from "./Kanban";
import { Tag } from "./Tag";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public isDone!: boolean;
  public kanbanId!: number;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    kanbanId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "tasks" }
);

Task.belongsTo(Kanban, { foreignKey: "kanbanId" });
Kanban.hasMany(Task, { foreignKey: "kanbanId" });
Task.belongsToMany(Tag, { through: "TaskTags" });
Tag.belongsToMany(Task, { through: "TaskTags" });

export default Task