import { BASE_URL } from '../config';
import { api } from '../apiClient';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../storage';

export const continueAsGuest = async () => {
  const response = await fetch(`${BASE_URL}/auth/guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error('Failed to continue as guest.');
  }

  const data = await response.json();

  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  return data;
};

export const getMe = async () => {
  const data = await api('/auth/me');
  return data.user;
};

export const logout = async () => {
  const refreshToken = getRefreshToken();

  try {
    if (refreshToken) {
      await api('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    }
  } catch {
    // Continue logout even if the server request fails.
  } finally {
    removeAccessToken();
    removeRefreshToken();
  }
};
