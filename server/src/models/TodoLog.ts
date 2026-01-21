import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName: "todo-logs" })
export class TodoLog extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  task!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isDone!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId!: number;

  @BelongsTo(() => User)
  User!: User;
}
