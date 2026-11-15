import { BASE_URL } from './config';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './storage';

export const api = async (endpoint: string, options: RequestInit) => {
  const token = getAccessToken();

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Authorization: token ? `Bearer ${token}` : ""
    },
  });

  if (response.status === 401 || response.status === 403) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('Please login again.');
    }
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResponse.ok) {
      if (
        refreshResponse.status === 400 ||
        refreshResponse.status === 401 ||
        refreshResponse.status === 403
      ) {
        removeAccessToken();
        removeRefreshToken();
      }
      throw new Error('Unable to refresh session.');
    }

    const data = await refreshResponse.json();

    if (!data.accessToken) {
      throw new Error('Invalid refresh response');
    }

    setAccessToken(data.accessToken);

    if (data.refreshToken) {
      setRefreshToken(data.refreshToken);
    }

    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${data.accessToken}` } : {}),
        // Authorization: token ? `Bearer ${token}` : ""
      },
    });
  }

  if (!response.ok) {
    throw new Error('API failed');
  }

  const data = await response.json();
  return data.data;
};
