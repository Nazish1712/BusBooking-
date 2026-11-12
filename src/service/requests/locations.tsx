import { BASE_URL } from '../config';

export const fetchLocations = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/bus/locations?search=${encodeURIComponent(query)}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch locations.');
  }
  const data = await response.json();

  return data.data || [];
};
