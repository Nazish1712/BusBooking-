import { BASE_URL } from '../config';

export const fetchBusDetails = async (query: string) => {
  const response = await fetch(`${BASE_URL}/bus/${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to load bus details');
  }

  const busData = await response.json();

  return busData.data || [];
};
