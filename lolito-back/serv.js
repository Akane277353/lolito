const express = require('express')
const parse_items = require('./parse.js').parse_items;
const 
const cors = require('cors');

const app = express()
const port = 3000
const items = parse_items();


// const test = require('./parse.js').test;
// test()

app.use(cors());

app.get('/api/items', (req, res) => {
  res.send(items)
})

app.get('/api/champions', (req, res) => {
  res.send("not available yet")
})

app.get('/api/items/search/:recherche:category', (req, res) => {
  const recherche = req.params.recherche;
  const category = req.params.category;
  console.log(recherche, category);
  res.send("not available yet")
}

app.listen(port, () => {
  console.log("Server running on port " + port)
})
