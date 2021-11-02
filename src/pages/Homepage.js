import { LitElement, html, css } from 'lit';

export class Homepage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<p>Homepage</p>`;
  }
}

customElements.define('app-homepage', Homepage);
