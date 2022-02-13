import { ReactiveControllerHost } from 'lit'
import { MyEvent } from './my-events'
import { initialState, StatusRenderer, Task } from '@lit-labs/task'

// class EventsControllerAbstract implements ReactiveController {
//   hostConnected() {}
//   hostDisconnected() {}
// }

// export class EventsController extends EventsControllerAbstract {
//   events: string[] = []
// }

export class EventsController {
  private host: ReactiveControllerHost
  private task!: Task
  myevents!: MyEvent
  private _data!: string
  private _eventState!: string

  _onEventHandler = (event: any) => {
    if (event.data) {
      console.log('recibo event')
      this._data = event.data
    }
  }

  _onStateHandler = (state: Event) => {
    if (state) {
      console.log('recibo state')
      this.task.run = state.type
    }
  }

  constructor(host: ReactiveControllerHost) {
    this.host = host
    this.task = new Task<string[], string>(
      this.host,
      async ([data]: string[]) => {
        // console.log('entrando i guess', data)
        // if (data) {
        //   return initialState
        // }
        // const result = 'event.result'
        this.myevents = new MyEvent('http://localhost:3011/events')
        this.myevents.on('event1', this._onEventHandler)

        this.myevents.onerror = this._onStateHandler
        this.myevents.connect()

        if (this._eventState !== undefined) {
          throw new Error(this._eventState)
        }
        return this._data as string
      },
      () => [this.data]
    )
  }

  render(renderFunctions: StatusRenderer<string>) {
    return this.task.render(renderFunctions)
  }

  hostConnected() {
    // this.myevents.connect()
  }

  hostDisconnected() {
    this.myevents.removeEventListener('event1')
  }

  public get data(): string {
    return this._data
  }
  public set data(value: string) {
    this._data = value
    this.host.requestUpdate()
  }
}
