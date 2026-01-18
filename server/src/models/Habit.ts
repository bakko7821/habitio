import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

@Table({ tableName: "habits" })
export class Habit extends Model {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;
}
