import { LitElement, html, css } from 'lit';
import '../components/Lights.js';
import '../components/Header.js';
import '../components/Button.js';

export class Gamepage extends LitElement {
  static get properties() {
    return {
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

  render() {
    return html`
      <app-header></app-header>
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
