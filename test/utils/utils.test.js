import { expect } from '@open-wc/testing';
import { validateUsername } from '../../src/utils/utils.js';

describe('Testing all the util functions', () => {
  let username;
  beforeEach(() => {
    username = 'username';
  });

  it('should return true with the given username', () => {
    const isValid = validateUsername(username);
    expect(isValid).to.be.true;
  });

  it('should return false with the given username', () => {
    username = 'short';
    const isValid = validateUsername(username);
    expect(isValid).to.be.false;
  });
});
