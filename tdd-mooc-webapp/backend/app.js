const express = require("express");

const app = express();
const apiRouter = express.Router();
const todoRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.send("Hello from backend");
});

todoRouter.get("/", (_, res) => {
  res.send([])
})

apiRouter.use('/todos', todoRouter)
app.use('/api', apiRouter)


module.exports = app;
