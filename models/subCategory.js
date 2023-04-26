const { Sequelize, DataTypes } = require("sequelize");
const category = require("./category");
const sequelize = require("../dbConnection").sequelize;

const subcategory = sequelize.define(
  "subcategory",
  {
    scId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    parentCid: {
      type: DataTypes.UUID,
      references: {
        model: "category",
        key: "cId",
      },
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = subcategory;
