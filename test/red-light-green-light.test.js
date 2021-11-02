import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/red-light-green-light.js';

describe('RedLightGreenLight', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(
      html`<red-light-green-light></red-light-green-light>`
    );
  });

  it('renders an element with class ".router-node", for the router to work', () => {
    const node = element.shadowRoot.querySelector('.router-node');
    expect(node).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
