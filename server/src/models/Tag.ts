import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Task } from "./Task";

export class Tag extends Model {
  public id!: number;
  public title!: string;
  public color!: string;
}

Tag.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "tags" }
);

export default Tag
