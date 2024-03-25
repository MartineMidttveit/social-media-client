import { login } from './login';
import * as storage from '../../storage/index.js';
import * as constants from '../constants.js';
import * as headersModule from '../headers.js';

jest.mock('../../storage/index.js', () => ({
  save: jest.fn(),
}));

global.fetch = jest.fn();

jest.mock('../constants.js', () => ({
  apiPath: 'mockedApiPath',
}));

jest.mock('../headers.js', () => ({
  headers: jest.fn().mockReturnValue({ 'Content-Type': 'application/json' }),
}));

describe('login function', () => {
  beforeEach(() => {
    fetch.mockClear();
    storage.save.mockClear();
  });

  it('stores a token when provided with valid credentials', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'mockedToken', user: { id: '1', name: 'John Doe' } }),
    });

    const email = 'user@example.com';
    const password = 'password123';

    const profile = await login(email, password);

    expect(fetch).toHaveBeenCalledWith('mockedApiPath/social/auth/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(storage.save).toHaveBeenCalledTimes(2);
    expect(storage.save).toHaveBeenCalledWith('token', 'mockedToken');
    expect(storage.save).toHaveBeenCalledWith('profile', { user: { id: '1', name: 'John Doe' } });
    expect(profile).toEqual({ user: { id: '1', name: 'John Doe' } });
  });
});