import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./User";

export class Habit extends Model {
  public id!: number;
  public name!: string;
  public color!: string;
  public type!: string;
  public ownerId!: number;
}

Habit.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "habits" }
);

Habit.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Habit, { foreignKey: "ownerId" });

export default Habit