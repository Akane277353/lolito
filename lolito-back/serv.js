const express = require('express')
const app = express()
const port = 3000
const parse_items = require('./parse.js').parse_items;

app.get('/api/items', (req, res) => {
  res.send(parse_items())
})

app.listen(port, () => {
  console.log("Server running on port " + port)
})
