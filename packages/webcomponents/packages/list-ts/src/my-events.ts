type EventListener = { type: string; listener: any; options?: any }

// class MyEventSource extends EventTarget implements EventSource{
//   onerror: ((this: EventSource, ev: Event) => any) | null
//   onmessage: ((this: EventSource, ev: MessageEvent<any>) => any) | null
//   onopen: ((this: EventSource, ev: Event) => any) | null
//   readyState: number
//   url: string
//   withCredentials: boolean
//   close(): void {
//     throw new Error("Method not implemented.")
//   }
//   CLOSED: number
//   CONNECTING: number
//   OPEN: number

// }

export class MyEvent implements EventSource {
  EventSourceEventMap: Map<string, EventListener> = new Map()
  EE!: EventSource
  readyState!: number
  url!: string
  withCredentials: boolean = false
  CLOSED!: number
  CONNECTING!: number
  OPEN!: number
  constructor(url: string, options?: any) {
    if (url) {
      this.url = url
    }
    if (options) {
      if (options.withCredentials) {
        this.withCredentials = true
      }
    }
  }
  on(type: string, listener: any) {
    this.addEventListener(type, listener)
  }
  connect(options?: { reconnect: boolean; obj: object }) {
    if (this.EE && this.EE.url === this.url) {
      throw new Error(`Connection already stabished at: ${this.url}`)
    }
    if (options && options.reconnect) {
    }
    let EE = new EventSource(this.url)
    if (!this.onerror) {
      EE.onerror = () => {
        //console.error(error)
        EE.close()
        throw new Error('Servidor no disponible')
      }
    } else {
      EE.onerror = this.onerror
    }

    this.EventSourceEventMap.forEach((ee, key) => {
      EE.addEventListener(key, ee.listener)
    })
    console.log('pasa pa abajo')
    this.EE = EE
  }
  onerror!: ((this: EventSource, ev: Event) => any) | null
  onmessage!: ((this: EventSource, ev: MessageEvent<any>) => any) | null
  onopen!: ((this: EventSource, ev: Event) => any) | null
  close(): void {
    this.EE.close()
  }
  //
  addEventListener(type: any, listener: any, options?: any): void {
    this.EventSourceEventMap.set(type, { type, listener, options })
  }
  removeEventListener(type: any): void {
    const listener = this.EventSourceEventMap.get(type)?.listener
    this.EE.removeEventListener(type, listener)
    this.EventSourceEventMap.delete(type)
  }
  dispatchEvent(event: Event): boolean {
    throw new Error('Method not implemented.')
  }
}
