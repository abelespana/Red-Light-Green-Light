import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import '../components/Lights.js';
import '../components/Header.js';
import '../components/Button.js';

export class Gamepage extends LitElement {
  static get properties() {
    return {
      currentUser: { type: String },
      currentLight: { type: String },
      lastButtonPressed: { type: String },
      score: { type: Number },
      maxScore: { type: Number },
      initialTimeout: { type: Number },
      interval: { type: Number },
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
    this.score = 0;
    this.maxScore = 0;
    this.initialTimeout = 3000;
  }

  firstUpdated() {
    this.updateLightsTimer(this.initialTimeout);
    this.retrieveUsername();
  }

  updateLightsTimer(timeout) {
    // console.log(`timeout fijado en ${timeout}`);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
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

  updateGreenLight() {
    if (this.score === 0) {
      this.updateLightsTimer(10000);
    } else {
      let timer = 10000;
      for (let i = 0; i < this.score; i++) {
        timer = timer - 100;
      }
      timer = timer < 2000 ? 2000 : timer;
      this.updateLightsTimer(timer);
    }
  }

  retrieveUsername() {
    this.currentUser = localStorage.getItem('username') || '';
    if (this.currentUser !== '') {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userFound = users.find(user => user.name === this.currentUser);
      if (userFound) {
        this.score = userFound.score;
        this.maxScore = userFound.maxScore;
      }
    }
  }

  updateScore(e) {
    // Only get points if light is green. Otherwise, set points to 0
    if (this.currentLight === 'green') {
      this.updateGreenLight();
      // Add one point if the button is different from the one previously clicked. Otherwise, subtract one point
      if (this.lastButtonPressed !== e.detail.buttonId) {
        this.score = this.score + 1;
        this.maxScore = this.score;
        this.lastButtonPressed = e.detail.buttonId;
      } else {
        this.score = this.score === 0 ? (this.score = 0) : this.score - 1;
      }
    } else {
      this.score = 0;
      this.updateLightsTimer(this.initialTimeout);
    }
  }

  handleLogout() {
    this.addOrUpdateUser();
    Router.go('/home');
  }

  addOrUpdateUser() {
    // Before logging out, create the current user with its points
    const currentUser = {
      name: this.currentUser,
      score: this.score,
      maxScore: this.maxScore,
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
        @logout="${this.handleLogout}"
      >
      </app-header>
      <span>Puntos: ${this.score}</span>
      <app-lights currentLight="${this.currentLight}"></app-lights>
      <div class="game__buttons">
        <app-button
          value="left"
          @button-click="${this.updateScore}"
        ></app-button>
        <app-button
          value="right"
          @button-click="${this.updateScore}"
        ></app-button>
      </div>
      <small>Máxima puntuación: ${this.maxScore}</small>
    `;
  }
}

customElements.define('app-gamepage', Gamepage);
