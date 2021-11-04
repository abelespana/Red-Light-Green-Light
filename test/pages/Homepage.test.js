import { html } from 'lit';
import { expect, fixture } from '@open-wc/testing';

import '../../src/pages/Homepage.js';

describe('Testing the Home page', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(
      html`<app-homepage></app-homepage>`
    )
  });

  it('when button clicked, should save the value of the input to the component property', async () => {
    const username = 'abelespana';
    const input = element.shadowRoot.querySelector('input');
    input.value = username;
    input.dispatchEvent(new Event('keyup'));
    expect(element._username).to.equal(username);
  })
})
