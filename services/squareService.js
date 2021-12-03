const { SquareModel, ThemeModel } = require("../models");

class SquareService {
  async createSquare(square) {
    try {
      const { squareValue, theme } = square;

      await SquareModel.create({
        squareValue,
        themeId: theme
      });
      return { statusCode: 201, message: "Successful Square created" };
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async getByTheme(theme) {
    try {
      const squaresByTheme = await SquareModel.findAll({
        where:{themeId: theme},
        attributes: ['squareValue'],
      });

      let random25Deck = [];
      let rowArray = [];
      
      for (let count = 25; count > 0; count--) {
        let randomFood = Math.floor(Math.random() * squaresByTheme.length);
        let food = squaresByTheme.splice(randomFood, 1)[0];
        random25Deck.push(food);
      }
      
      for (let innerCount = 0; innerCount < 5; innerCount++) {
        let minideck = [];
        for (let i = 0; i < 5; i++) {
          let randomIndex = Math.floor(Math.random() * random25Deck.length);
          let square = random25Deck.splice(randomIndex, 1)[0];
          minideck.push(square);
        }
        rowArray.push(minideck);
      }

      if (rowArray) {
        return {statusCode: 200, message: 'Squares by theme successfully retrieved', rowArray};
      } else {
        return {statusCode: 204}
      }
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }
}

module.exports = SquareService