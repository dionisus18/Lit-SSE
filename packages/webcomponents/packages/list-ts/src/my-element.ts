import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { EventsController } from './events-controller'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  private controller = new EventsController(this)

  render() {
    return html`<p>Hello from my template.</p>
      <pre>
      ${this.controller.render({
          complete: (result: string) => html`
            <p>Singe Data</p>
            <p>${result}</p>
          `,
          initial: () => html`<p>Aun no ha llegado nada</p>`,
          pending: () => html`<p>Cargando...</p>`,
          error: (e: any) => html`<p>Error: ${e}</p>`,
        })}
      </pre
      > `
  }

  // private _kindChange(e: Event) {
  //   this.names.kind = (e.target as HTMLSelectElement).value as Names.Kind
  // }
}
