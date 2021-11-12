import { LitElement, html, css } from 'lit';
import Swal from 'sweetalert2';
import { Router } from '@vaadin/router';
import { validateUsername } from '../utils/utils.js';

import '../components/Button.js';

export class Homepage extends LitElement {
  static get properties() {
    return {
      _username: { type: String },
      _usernameValid: { type: Boolean },
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
    this._username = '';
  }

  /**
   * Updates the username property
   * @param { event } ev The whole event sent by the button, from which the value can be extracted
   * @private
   */
  _handleInputChange(ev) {
    this._username = ev.target.value;
  }

  /**
   * Using an imported validator, check if the username chosen by the player is a valid one (>= 6 characters). If so, navigate to the game. Otherwise, show error message
   * @private
   */
  _addNewUser() {
    this._usernameValid = validateUsername(this._username);
    if (this._usernameValid) {
      localStorage.setItem('username', this._username);
      Router.go('/game');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El usuario debe contener 6 caracteres al menos',
      });
    }
  }

  /**
   * renders an input with a label and a button
   * @private
   */
  _renderForm() {
    return html`
      <div class="form">
        <label>Nombre de usuario</label>
        <input .value="${this._username}" @keyup="${this._handleInputChange}" />
        <app-button
          value="Unirme"
          @button-click=${this._addNewUser}
        ></app-button>
      </div>
    `;
  }

  render() {
    return html` ${this._renderForm()} `;
  }
}

customElements.define('app-homepage', Homepage);
