import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

import './pages/Homepage.js';
import './pages/Gamepage.js';

export class RedLightGreenLight extends LitElement {
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
        max-width: 1140px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--red-light-green-light-background-color);
      }
    `;
  }

  firstUpdated() {
    const node = this.renderRoot.querySelector('.router-node');
    const router = new Router(node);

    router.setRoutes([
      { path: '/home', component: 'app-homepage' },
      { path: '/game', component: 'app-gamepage' },
      { path: '(.*)', component: 'app-homepage' },
    ]);
  }

  render() {
    return html`<main class="router-node"></main> `;
  }
}
