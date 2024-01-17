const express = require('express')
const parse_items = require('./parse.js').parse_items;
const cors = require('cors');

const app = express()
const port = 3000
const items = parse_items();

app.use(cors());

app.get('/api/items', (req, res) => {
  res.send(items)
})

app.get('/api/champions', (req, res) => {
  res.send("not available yet")
})

app.listen(port, () => {
  console.log("Server running on port " + port)
})
