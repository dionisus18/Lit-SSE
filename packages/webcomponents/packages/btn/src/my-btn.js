import { html, css, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "@material/mwc-button";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyBtn extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
  }

  static get properties() {
    return {
      disabled: { type: Boolean },
      outline: { type: Boolean },
      raised: { type: Boolean },
    };
  }

  render() {
    let attr = "";
    this.constructor.elementProperties.forEach((value, key) => {
      if (
        value.type === Boolean &&
        !value.state &&
        this[key] &&
        key !== "disabled"
      )
        attr += html`${key}`;
    });
    console.log(this.constructor);
    console.log(this);

    return html`
      <mwc-button id="myButton" ?disabled=${this.disabled} ${attr}
        ><slot></slot
      ></mwc-button>
    `;
  }
}

window.customElements.define("my-btn", MyBtn);
