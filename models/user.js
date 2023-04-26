const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection").sequelize;

const userReg = sequelize.define(
  "users",
  {
    uId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 1 will be for the admin and 0 is for regular user
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = userReg;
