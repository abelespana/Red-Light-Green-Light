import { LitElement, html, css } from 'lit';
import '../components/Lights.js';
import '../components/Header.js';

export class Gamepage extends LitElement {
  static get properties() {
    return {
      currentLight: { type: String },
      lastButtonPressed: { type: String },
      score: { type: Number },
      maxScore: { type: Number },
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
  }

  firstUpdated() {
    this.updateCurrentLight();
  }

  retrieveMaxScore() {}

  updateCurrentLight() {
    setInterval(() => {
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
    }, 3000);
  }

  increaseScore(event) {
    // Only get point if light is green. Otherwise, set points to 0
    if (this.currentLight === 'green') {
      // Add one point if the button is different from the one previously clicked. Otherwise, subtract one point
      if (this.lastButtonPressed !== event.target.value) {
        this.score = this.score + 1;
        this.maxScore = this.score;
        this.lastButtonPressed = event.target.value;
      } else {
        this.score = this.score === 0 ? (this.score = 0) : this.score - 1;
      }
    } else {
      this.score = 0;
    }
  }

  render() {
    return html`
      <app-header></app-header>
      <span>Puntuacion: ${this.score}</span>
      <app-lights currentLight="${this.currentLight}"></app-lights>
      <div class="game__buttons">
        <button value="left" @click="${this.increaseScore}">Left</button>
        <button value="right" @click="${this.increaseScore}">Right</button>
      </div>
      <small>Puntuación máxima: ${this.maxScore}</small>
    `;
  }
}

customElements.define('app-gamepage', Gamepage);
