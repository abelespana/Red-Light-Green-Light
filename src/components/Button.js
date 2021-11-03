import { LitElement, html, css } from 'lit';

export class Button extends LitElement {
  static get properties() {
    return {
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
      }
    `;
  }

  constructor() {
    super();
    this.value = '';
  }

  emitEvent(e) {
    const event = new CustomEvent('button-click', {
      detail: {
        buttonId: e.target.value,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button value="${this.value}" @click="${this.emitEvent}">
        ${this.value}
      </button>
    `;
  }
}

customElements.define('app-button', Button);
