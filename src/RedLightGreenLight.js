import { LitElement, html, css } from 'lit';

export class RedLightGreenLight extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--red-light-green-light-background-color);
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
  }

  firstUpdated() {}

  render() {
    return html` <main class="router-node"></main> `;
  }
}
