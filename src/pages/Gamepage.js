import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import '../components/Lights.js';
import '../components/Header.js';
import '../components/Button.js';

export class Gamepage extends LitElement {
  static get properties() {
    return {
      currentLight: { type: String },
      currentUser: { type: String },
      _lastButtonPressed: { type: String },
      _score: { type: Number },
      _maxScore: { type: Number },
      _initialTimeout: { type: Number },
      _interval: { type: Number },
      _buttons: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
      }

      .game__buttons {
        display: flex;
        width: 150px;
        justify-content: space-around;
        margin: 15px 0;
      }
    `;
  }

  constructor() {
    super();
    this.currentLight = 'green';
    this._score = 0;
    this._maxScore = 0;
    this._initialTimeout = 3000;
    this._buttons = ['left', 'right'];
  }

  firstUpdated() {
    this._updateLightsTimer(this._initialTimeout);
    this._retrieveUsername();
  }

  /**
   * Set and clear a time interval in which the light switches color
   * @param { number } timeout Time in miliseconds that the interval will last
   * @private
   */
  _updateLightsTimer(timeout) {
    clearInterval(this._interval);
    this._interval = setInterval(() => {
      switch (this.currentLight) {
        case 'green':
          this.currentLight = 'red';
          break;
        case 'red':
          this.currentLight = 'green';
          break;
        default:
          break;
      }
    }, timeout);
  }

  /**
   * Launch the updateLightsTimer interval by with different times based on user's score
   * @private
   */
  _updateGreenLight() {
    if (this._score === 0) {
      this._updateLightsTimer(10000);
    } else {
      let timer = 10000;
      for (let i = 0; i < this._score; i++) {
        timer = timer - 100;
      }
      timer = timer < 2000 ? 2000 : timer;
      this._updateLightsTimer(timer);
    }
  }

  /**
   * Set and clear a time interval during which the light switches color
   * @private
   */
  _retrieveUsername() {
    this.currentUser = localStorage.getItem('username') || '';
    if (this.currentUser !== '') {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userFound = users.find(user => user.name === this.currentUser);
      if (userFound) {
        this._score = userFound.score;
        this._maxScore = userFound.maxScore;
      }
    }
  }

  /**
   * Update user's score based on the current active light and the button that was pressed
   * @param { event } e The custom event sent by the button component, from which the clicked button can be read
   * @private
   */
  _updateScore(e) {
    // Only get points if light is green. Otherwise, set points to 0
    if (this.currentLight === 'green') {
      this._updateGreenLight();
      // Add one point if the button is different from the one previously clicked. Otherwise, subtract one point
      if (this._lastButtonPressed !== e.detail.buttonId) {
        this._score = this._score + 1;
        this._maxScore = this._score;
        this._lastButtonPressed = e.detail.buttonId;
      } else {
        this._score = this._score === 0 ? 0 : this._score - 1;
      }
    } else {
      this._score = 0;
      this._updateLightsTimer(this._initialTimeout);
    }
  }

  /**
   * Handles the custom event for logout sent by the header component
   * @private
   */
  _handleLogout() {
    this._addOrUpdateUser();
    Router.go('/home');
  }

  /**
   * Update the current user score or creates it if doesn't exist
   * @private
   */
  _addOrUpdateUser() {
    // Before logging out, create the current user with its points
    const currentUser = {
      name: this.currentUser,
      score: this._score,
      maxScore: this._maxScore,
    };
    // Retrieve the users saved in localStorage
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      // No previous users, create the whole property with one entry in localStorage
      users = [];
      users.push(currentUser);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      // There are users, find if there is one that can be updated
      // TODO: investigar el index que devuelve el find
      const userFound = users.find(user => user.name === currentUser.name);
      if (userFound) {
        // User can be updated with its latest score
        const index = users.findIndex(user => user.name === currentUser.name);
        users[index] = currentUser;
      } else {
        // No previous user with that name, just add it to the list
        users.push(currentUser);
      }
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  render() {
    return html`
      <app-header
        username="${this.currentUser}"
        iconName="log-out"
        @logout="${this._handleLogout}"
      >
      </app-header>
      <span>Puntos: ${this._score}</span>
      <app-lights currentLight="${this.currentLight}"></app-lights>
      <div class="game__buttons">
        ${this._buttons.map(
          button =>
            html`<app-button
              .value="${button}"
              @button-click="${this._updateScore}"
            ></app-button>`
        )}
      </div>
      <small>Máxima puntuación: ${this._maxScore}</small>
    `;
  }
}

customElements.define('app-gamepage', Gamepage);
