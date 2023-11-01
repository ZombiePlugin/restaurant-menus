const { sequelize } = require("../db");
const { Sequelize, DataTypes } = require("sequelize");

// TODO - create a Restaurant model
const Restaurant = sequelize.define("Restaurant", {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
});

module.exports = { Restaurant };
