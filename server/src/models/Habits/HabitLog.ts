import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Habit } from "./Habit";

@Table({ tableName: "habits-logs" })
export class HabitLog extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  value!: number;

  @ForeignKey(() => Habit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  habitId!: number;

  @BelongsTo(() => Habit)
  habit!: Habit;
}
