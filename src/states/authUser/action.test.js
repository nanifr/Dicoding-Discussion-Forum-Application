import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import api from '../../utils/api';

vi.mock('../../utils/api');

/**
 * skenario testing:
 * - asyncSetAuthUser thunk
 *   - should dispatch showLoading, setAuthUserActionCreator, and hideLoading
 *     actions in the correct order when login succeeds
 *   - should call api.login and api.putAccessToken with the correct
 *     arguments, and return true, when login succeeds
 *   - should dispatch showLoading and hideLoading only (without
 *     setAuthUserActionCreator), call alert with the error message, and
 *     return false, when login fails
 */

describe('asyncSetAuthUser thunk', () => {
  const fakeUser = {
    id: 'users-1',
    name: 'Dimas',
    email: 'dimas@mail.com',
    avatar: 'https://generated-avatar.jpg',
  };
  const loginPayload = { email: 'dimas@mail.com', password: 'password123' };

  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should dispatch showLoading, setAuthUserActionCreator, and hideLoading actions in the correct order when login succeeds', async () => {
    // arrange
    api.login.mockResolvedValueOnce('fake-token');
    api.getOwnProfile.mockResolvedValueOnce(fakeUser);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(loginPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('should call api.login and api.putAccessToken with the correct arguments, and return true, when login succeeds', async () => {
    // arrange
    api.login.mockResolvedValueOnce('fake-token');
    api.getOwnProfile.mockResolvedValueOnce(fakeUser);
    const dispatch = vi.fn();

    // action
    const result = await asyncSetAuthUser(loginPayload)(dispatch);

    // assert
    expect(api.login).toHaveBeenCalledWith(loginPayload);
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(result).toBe(true);
  });

  it('should dispatch showLoading and hideLoading only, call alert with the error message, and return false, when login fails', async () => {
    // arrange
    api.login.mockRejectedValueOnce(new Error('email atau password salah'));
    const dispatch = vi.fn();

    // action
    const result = await asyncSetAuthUser(loginPayload)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
    expect(window.alert).toHaveBeenCalledWith('email atau password salah');
    expect(result).toBe(false);
  });
});
