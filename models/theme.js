const { DataTypes } = require('sequelize');
const db = require('../db');

const Theme = db.define("theme", {
  themeName: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

module.exports = Theme;