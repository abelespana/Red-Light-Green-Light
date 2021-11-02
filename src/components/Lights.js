import { LitElement, html, css } from 'lit';

export class Lights extends LitElement {
  static get properties() {
    return {
      currentLight: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        --color-red: red;
        --color-green: yellowgreen;
        --color-grey: grey;
      }
      .lights {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 80px;
        height: 150px;
        border-radius: 8px;
        background-color: var(--color-grey);
        margin-bottom: 50px;
        position: relative;
      }
      .lights::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 50px;
        background-color: black;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
      }
      .light {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        opacity: 0.3;
      }
      .light--active {
        opacity: 1;
      }
      .lights__red-light {
        background-color: var(--color-red);
      }
      .lights__green-light {
        background-color: var(--color-green);
      }
    `;
  }

  render() {
    return html`
      <div class="lights">
        <div
          class="light lights__red-light
        ${this.currentLight === 'red' ? 'light--active' : ''}"
        ></div>
        <div
          class="light lights__green-light
        ${this.currentLight === 'green' ? 'light--active' : ''}"
        ></div>
      </div>
    `;
  }
}
customElements.define('app-lights', Lights);
