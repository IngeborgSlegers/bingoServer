const SquareModel = require('./square');
const ThemeModel = require('./theme');

ThemeModel.hasMany(SquareModel);
SquareModel.belongsTo(ThemeModel);

module.exports = {ThemeModel, SquareModel};