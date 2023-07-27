// models/Department.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database"); // Replace "./database" with the correct path to your database.js file

const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Department;
