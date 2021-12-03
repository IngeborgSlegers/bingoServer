const { ThemeModel } = require("../models");

class ThemeService {
  async createTheme(theme) {
    try {
      const { themeName } = theme;

      await ThemeModel.create({
        themeName
      });
      return { statusCode: 201, message: "Successful Theme created" };
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async getThemes() {
    try {
      const themes = await ThemeModel.findAll();
      return { statusCode: 200, message: "Themes successfully retrieved", themes };
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }
}

module.exports = ThemeService