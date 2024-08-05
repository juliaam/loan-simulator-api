import { DataTypes } from "sequelize";
import { sequelize } from "../../../app";

export const Loan = sequelize.define(
  "loan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "loan",
    timestamps: false,
  }
);
