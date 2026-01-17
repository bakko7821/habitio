import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

@Table({ tableName: "users" })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
