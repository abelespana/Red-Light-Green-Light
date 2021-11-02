import { LitElement, html, css } from 'lit';

export class Gamepage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<p>Gamepage</p>`;
  }
}

customElements.define('app-gamepage', Gamepage);
