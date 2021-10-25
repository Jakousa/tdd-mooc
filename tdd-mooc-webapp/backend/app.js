const express = require("express");
require("./models/connection")
const Todo = require('./models/Todo')

const app = express();
const apiRouter = express.Router();
const todoRouter = express.Router();

app.use(express.json())

apiRouter.get("/", (_, res) => {
  res.send("Hello from backend");
});

todoRouter.get("/", async (_, res) => {
  const todos = await Todo.query().select('todos.*')
  console.log(todos)
  res.send(todos)
})

todoRouter.post("/", (req, res) => {
  res.send(req.body)
})

apiRouter.use('/todos', todoRouter)
app.use('/api', apiRouter)


module.exports = app;
