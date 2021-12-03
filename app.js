const Express = require('express');
const db = require('./db');

const app = Express();

const middlewares = require('./middlewares');
const controllers = require('./controllers');

app.use(middlewares.cors)

app.use(Express.json());

app.use("/theme", controllers.themeController);
app.use("/square", controllers.squareController)

db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(4000, () => {
      console.log(`[server]: App is listening on localhost:4000`);
    })
  })
  .catch((err) => {
    console.log(`[server]: Server crashed`);
    console.log(err);
  });