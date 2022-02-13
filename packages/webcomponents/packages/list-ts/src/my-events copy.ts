type EventListener = { type: string; listener: any; options?: any }
class MyEventSource extends EventSource {
  EventMap: Map<string, EventListener> = new Map()
  constructor(url: string, options?: any) {
    super(url, options)
  }
  addEventListener(type: any, listener: any, options?: any): void {
    this.EventMap.set(type, { type, listener, options })
    return super.addEventListener(type, listener, options)
  }
  removeEventListener(type: any, listener: any, options?: any): void {
    this.EventMap.delete(type)
    return super.removeEventListener(type, listener, options)
  }
  connect() {
    this.EventMap.forEach((ee, key) => {
      this.addEventListener(key, ee.listener)
    })
  }
}
export class MyEvent {
  url: string
  options: any
  EE!: MyEventSource
  constructor(url: string, options?: any) {
    this.url = url
    this.options = options
  }
  on(type: string, listener: any): void {
    this.EE.addEventListener(type, listener)
  }
  connect(): void {
    let EE = new MyEventSource(this.url)
    this.EE = EE
    this.EE.connect()
  }
  close(): void {
    this.EE.close()
  }

  addEventListener(type: any, listener: any, options?: any): void {
    this.EE.addEventListener(type, listener, options)
  }
  removeEventListener(type: any, listener: any): void {
    this.EE.removeEventListener(type, listener)
  }
}
