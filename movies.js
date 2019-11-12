// Do the following API endpoints
// Iteration 1: Get all movies
// Iteration 2: With same endpoint add an option to get it ordered by rate (asc & desc)
// Iteration 3: Get movies count
// Iteration 4: Get all the movies of a single year
// Iteration 5: Get All rates average
// Iteration 6: Get movies of a genre
// Iteration 7: Get movies that has more than X rate

// BONUS Iteration: Get films grouped by year of a genre
'use strict'
const data = require('./data')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.get('/movies', (req, res, next) => {
  return res.send(data)
})

app.get('/movies/order/:orderType', (req, res, next) => {
  if (req.params.orderType === 'asc') {
    return res.send(data.sort((a, b) => (+a.rate > +b.rate) ? 1 : (+b.rate > +a.rate) ? -1 : 0))
  } else if (req.params.orderType === 'desc') {
    return res.send(data.sort((a, b) => (+a.rate < +b.rate) ? 1 : (+b.rate < +a.rate) ? -1 : 0))
  }
})

app.get('/movies/total', (req, res, next) => {
  return res.send('El número total es ' + data.length)
})

app.get('/movies/year/:year', (req, res, next) => {
  return res.send(data.filter(s => +s.year === +req.params.year))
})

app.get('/movies/rate', (req, res, next) => {
  return res.send('The average rate is ' + (data.reduce((acc, value) => { return acc + (+value.rate) }, 0) / data.length).toFixed(2))
})

app.get('/movies/genre/:genre', (req, res, next) => {
  return res.send(data.filter(s => s.genre.map(s => s.toUpperCase()).includes(req.params.genre.toUpperCase())))
})

app.get('/movies/rate-up/:rate', (req, res, next) => {
  return res.send(data.filter(s => +s.rate > +req.params.rate))
})

app.get('/movies/genrebyyear/:genre', (req, res, next) => {
  return res.send(data.filter(s => s.genre.map(s => s.toUpperCase()).includes(req.params.genre.toUpperCase()))
    .reduce((acc, value) => {
      const key = value.year
      if (!acc[key]) acc[key] = []
      acc[key].push(value)
      return acc
    }, {}))
})

app.listen(3001, () => {
  console.log('Init service')
})
