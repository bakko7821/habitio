import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Habit } from "./Habit";

export class HabitLog extends Model {
  public id!: number;
  public habitId!: number;
  public value?: number;
  public isDone!: boolean;
  public date!: string; // 17-01-2026
}

HabitLog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    habitId: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: true },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    date: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "habit_logs" }
);

HabitLog.belongsTo(Habit, { foreignKey: "habitId" });
Habit.hasMany(HabitLog, { foreignKey: "habitId" });

export default HabitLog