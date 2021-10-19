const express = require("express");

const app = express();
const apiRouter = express.Router();
const todoRouter = express.Router();

app.use(express.json())

apiRouter.get("/", (_, res) => {
  res.send("Hello from backend");
});

todoRouter.get("/", (_, res) => {
  res.send([])
})

todoRouter.post("/", (req, res) => {
  res.send(req.body)
})

apiRouter.use('/todos', todoRouter)
app.use('/api', apiRouter)


module.exports = app;
