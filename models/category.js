const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection").sequelize;

const category = sequelize.define(
  "category",
  {
    cId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = category;
