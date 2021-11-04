import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/components/Lights.js';

describe('Testing the lights component', () => {
  const currentLight = 'green';
  let element;
  beforeEach(async () => {
    element = await fixture(
      html`<app-lights currentLight=${currentLight}></app-lights>`
    );
  });

  it('Second element should have class "light--active" when currentLight property is set to "green"', () => {
    const lights = element.shadowRoot.querySelectorAll('.light');
    expect(lights[0]).not.to.have.class('light--active');
    expect(lights[1]).to.have.class('light--active');
  });
});
