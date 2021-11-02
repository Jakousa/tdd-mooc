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
  res.send(todos)
})

todoRouter.post("/", async (req, res) => {
  const { text } = req.body
  const todo = await Todo.query().insert({
    text
  })

  res.send(todo)
})

todoRouter.put("/:id", async (req, res) => {
  const { id } = req.params

  const todo = await Todo.query().patchAndFetchById(id, req.body);
  res.send(todo)
})

todoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  await Todo.query().deleteById(id)
  res.sendStatus(204)
})

apiRouter.use('/todos', todoRouter)
app.use('/api', apiRouter)


module.exports = app;
