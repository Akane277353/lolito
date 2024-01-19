const express = require('express')
const parse_items = require('./parse.js').parse_items;
const chercher = require('./parse.js').chercher;
const categories = require('./parse.js').categories;
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

app.get('/api/recherche/:recherche/:categorie', (req, res) => {
  res.send(chercher(req.params['recherche'], req.params['categorie']))
})

app.get('/api/categorie/:categorie', (req, res) => {
  res.send(chercher("", req.params.categorie))
})

app.get('/api/categorieliste', (req, res) => {
  res.send(categories)
})


app.listen(port, () => {
  console.log("Server running on port " + port)
})
