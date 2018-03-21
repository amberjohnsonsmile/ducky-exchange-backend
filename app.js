const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const queries = require("./queries")

app.use(bodyParser.json())
app.use(cors())

app.get("/", (request, response) => {
  queries
    .list("data")
    .then(data => {
      response.json({ data })
    })
    .catch(console.error)
})

app.use((request, response) => {
  response.sendStatus(404)
})

app.listen(process.env.PORT || 3000)
