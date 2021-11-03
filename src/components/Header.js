import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class Header extends LitElement {
  static get properties() {
    return {
      username: { type: String },
    };
  }

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
        margin-bottom: calc(var(--height) / 2);
        background-color: var(--black);
        color: var(--white);
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }

  logout() {
    localStorage.removeItem('username');
    Router.go('/home');
  }

  firstUpdated() {
    const savedUsername = localStorage.getItem('username');
    this.username = savedUsername || '';
  }

  render() {
    return html`
      <header class="header">
        <p>${this.username}</p>
        <ion-icon name="log-out" size="large" @click="${this.logout}">
        </ion-icon>
      </header>
    `;
  }
}
customElements.define('app-header', Header);
