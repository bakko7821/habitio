import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./User";
import { Task } from "./Task";

export class Kanban extends Model {
  public id!: number;
  public title!: string;
  public ownerId!: number;
}

Kanban.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "kanbans" }
);

Kanban.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Kanban, { foreignKey: "ownerId" });
Kanban.hasMany(Task, { foreignKey: "kanbanId" });

export default Kanban