const router = require("express").Router();
const {ThemeService} = require('../services');


router.post("/newTheme",  async (req, res) => {
  const {theme} = req.body;
  
  const {statusCode, message} = await new ThemeService().createTheme(theme);

  res.status(statusCode).json({
    message
  })
});

router.get("/", async (req, res) => {
  const {statusCode, message, themes} = await new ThemeService().getThemes();

  res.status(statusCode).json({
    message,
    themes
  })
})

module.exports = router