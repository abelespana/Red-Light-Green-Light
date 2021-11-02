import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class Header extends LitElement {
  static get styles() {
    return css`
      :host {
        --height: 60px;
        --black: rgb(0, 0, 0);
        --white: rgb(255, 255, 255);
        width: 100vw;
        padding: 0 15px;
        box-sizing: border-box;
        height: var(--height);
        line-height: var(--height);
        margin-bottom: calc(var(--height) / 2);
        background-color: var(--black);
        color: var(--white);
      }
      .header {
        display: flex;
        justify-content: space-between;
      }
    `;
  }

  logout() {
    Router.go('/home');
  }

  render() {
    return html`
      <header class="header">
        <span>Username</span>
        <span @click="${this.logout}" @keyup="${this.logout}">Logout</span>
      </header>
    `;
  }
}
customElements.define('app-header', Header);
