const router = require("express").Router();
const {SquareService} = require('../services');


router.post("/newSquare",  async (req, res) => {
  const {square} = req.body;
  
  const {statusCode, message} = await new SquareService().createSquare(square);

  res.status(statusCode).json({
    message
  })
});

router.get("/:themeId", async (req, res) => {
  const {themeId} = req.params

  const {statusCode, message, rowArray} = await new SquareService().getByTheme(themeId);

  res.status(statusCode).json({
    message,
    rowArray
  })
})

module.exports = router