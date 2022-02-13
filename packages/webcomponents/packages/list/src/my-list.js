import { html, css, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { repeat } from "lit/directives/repeat.js";
import { guard } from "lit/directives/guard.js";
import "@material/mwc-list/mwc-list.js";
import "@material/mwc-list/mwc-list-item.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyList extends LitElement {
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
    this.items = [
      "Elevator_Settings",
      "Kitty_Soap",
      "Elevator_Cone",
      "Android_Website",
      "Male_Trees",
      "Nuclear_Flowers",
      "Fence_Soda",
      "Video_games_Hnads",
      "YouTube_Monster",
      "Leash_Fusion",
      "Poop_Bird",
      "Clock_Towel",
      "Water_Toilet",
      "YouTube_BBQ",
      "Floppy_Disk_Solar",
      "Video_games_Crab",
      "Boat_Fence",
      "Printer_Whale",
      "Laptop_Puppy",
      "Toilet_Drugs",
      "Flowers_Shower",
      "Whale_Printer",
      "Fusion_Fusion",
      "Hnads_YouTube",
      "Fence_Shower",
      "Soap_Soda",
      "Shower_Toolbox",
      "Poop_Ring",
      "Male_Drugs",
      "Bird_Plus",
    ];
    this.valores = this.items.map((v) => 0);
    this.selected = "3";
    this.input = [0, 0, 0];
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      items: { type: Array },
      selected: { type: String, state: true },
      input: { type: Array },
    };
  }

  get select() {
    return this.shadowRoot.querySelector("#identy");
  }

  firstUpdated() {
    this.selected = 3;
  }

  render() {
    return html`
      <input id="input0" @input=${this.manejadorInputs(0)} />
      <input id="input1" @input=${this.manejadorInputs(1)} />
      <input id="input2" @input=${this.manejadorInputs(2)} />
      ${guard(
        [this.input[0]],
        () => html`<div>${console.log(0)} ${this.input[0]}</div>`
      )}
      ${guard(
        [this.input[1]],
        () => html`<div>${console.log(1)} ${this.input[1]}</div>`
      )}
      ${guard(
        [this.input[2]],
        () => html`<div>${console.log(2)} ${this.input[2]}</div>`
      )}
    `;
  }
  /*
  <ul>
        ${repeat(this.items, (value, id) =>
          guard(
            [this.items[id]],
            () => html`<li>${value} - ${this.valores[id]}</li>`
          )
        )}
      </ul>

  ${this.items.map((value, id) =>
    guard(
      [this.items[id]],
      () => html`<li>${value} - ${this.valores[id]}</li>`
    )
  )}

  */
  manejadorInputs(numero) {
    return (event) => {
      console.log(this.input, this.shadowRoot.querySelector("#input" + numero));
      this.input.splice(
        numero,
        1,
        this.shadowRoot.querySelector("#input" + numero).value
      );
      this.input = [...this.input];
      /*
      this.shadowRoot.querySelector(
        "#input" + numero
      ).value; */
    };
  }

  refillInputOnChangeSelect(event) {
    console.log(event);
    const selectVal = this.select.value;
    //console.log(selectVal);
    const inputElm = this.shadowRoot.querySelector("#nombre");
    if (selectVal && this.items[selectVal]) {
      inputElm.value = this.items[selectVal];
      inputElm.setAttribute("data-id", selectVal);
    }
    console.log(selectVal);
  }

  findAndChangeItem() {
    const inputElm = this.shadowRoot.querySelector("#nombre");
    const id = inputElm.getAttribute("data-id");
    this.items[id] = inputElm.value;
  }
}

window.customElements.define("my-list", MyList);
