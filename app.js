const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const queries = require('./queries')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (request, response) => {
  queries
    .list('exchange')
    .then(data => {
      response.json({ data })
    })
    .catch(console.error)
})

app.post('/', (request, response) => {
  queries
    .create('exchange', request.body)
    .then(data => {
      response.status(201).json({ data })
    })
    .catch(console.error)
})

// GET request for only latest item?

app.use((request, response) => {
  response.sendStatus(404);
})

console.log('Listening on port 3000');
app.listen(process.env.PORT || 3000)
