import { MyEvent } from './my-events'
const events = new MyEvent('http://localhost:3011/events')

events.onmessage = (event) => {
  const parsedData = JSON.parse(event.data)
  console.log(event, parsedData)
}
events.on('message', (evento: any) => {
  console.log(evento)
})
events.on('event1', (evento: any) => {
  console.log(evento)
})
events.connect()

setTimeout(() => {
  events.removeEventListener('message')
}, 10000)

setTimeout(() => {
  events.close()
}, 20000)
