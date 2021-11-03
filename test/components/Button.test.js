import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/components/Button.js';

describe('Testing custom component button', () => {
  const buttonStr = 'left';
  let appButton;
  beforeEach(async () => {
    appButton = await fixture(
      html`<app-button value="${buttonStr}"></app-button>`
    );
  });

  it('should render a button with the buttonStr "left" as value', () => {
    expect(appButton.value).to.equal(buttonStr);
  });
});
