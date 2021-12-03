const { DataTypes } = require('sequelize');
const db = require('../db');

const Square = db.define("square", {
  squareValue: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

module.exports = Square;