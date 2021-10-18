const express = require('express');

const app = express();

app.get('/api', (_, res) => {
  res.send('Hello from backend')
})

module.exports = app