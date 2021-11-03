import { LitElement, html, css } from 'lit';
import Swal from 'sweetalert2';
import { Router } from '@vaadin/router';
import { validateUsername } from '../utils/utils.js';

export class Homepage extends LitElement {
  static get properties() {
    return {
      username: { type: String },
      usernameValid: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .form {
        padding-top: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100px;
      }
    `;
  }

  constructor() {
    super();
    this.username = '';
  }

  handleInputChange(ev) {
    this.username = ev.target.value;
  }

  addNewUser() {
    this.usernameValid = validateUsername(this.username);
    if (this.usernameValid) {
      localStorage.setItem('username', this.username);
      Router.go('/game');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El usuario debe contener 6 caracteres al menos',
      });
    }
  }

  renderForm() {
    return html`
      <div class="form">
        <label>Nombre de usuario</label>
        <input .value="${this.username}" @keyup="${this.handleInputChange}" />
        <button type="button" @click="${this.addNewUser}">Unirme</button>
      </div>
    `;
  }

  render() {
    return html` ${this.renderForm()} `;
  }
}

customElements.define('app-homepage', Homepage);
