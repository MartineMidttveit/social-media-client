import * as storage from '../../storage/index'; // Import the entire module

jest.mock('../../storage/index', () => ({
  remove: jest.fn(),
}));

import { logout } from './logout.js';

describe('logout function', () => {
  it('Remove token from storage', () => {
    logout();
    expect(storage.remove).toHaveBeenCalledWith('token');
  });

  it('Remove profile from storage', () => {
    logout();
    expect(storage.remove).toHaveBeenCalledWith('profile');
  });
});

