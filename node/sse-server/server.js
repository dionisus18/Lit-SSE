const express = require('express')
const cors = require('cors')
const { sse } = require('@toverux/expresse')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (request, response) =>
  response.json({ clients: clients.length })
)

const PORT = 3011

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})

function eventsHandler(request, response, next) {
  setInterval(() => {
    const timestamp = Date.now()

    response.sse.data(`Hello from a named event: ${timestamp}`)
    response.sse.event('event1', 1)
  }, 1000)
}
// somewhere in your module
app.get('/events', sse(/* options */), (req, res) => {
  app.on('event1', (event) => {
    res.sse.event('event1', event)
  })
  app.on('message', (event) => {
    res.sse.data(event)
  })
  setInterval(() => {
    const timestamp = Date.now()
    res.sse.data('Hello from a generic event')
    res.sse.event('event1', `Hello from a named event: ${timestamp}`)
  }, 1000)
})
//app.get('/events', sse(), eventsHandler)
/*
function sendEventsToAll(newFact) {
  clients.forEach((client) =>
    client.response.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}

async function addFact(request, response, next) {
  const newFact = request.body;
  facts.push(newFact);
  response.json(newFact);
  return sendEventsToAll(newFact);
}

app.post("/fact", addFact); */
