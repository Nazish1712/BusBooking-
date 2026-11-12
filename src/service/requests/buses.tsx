import { BASE_URL } from '../config';

export const fetchBuses = async (
  from: string,
  to: string,
  date: string,
  type: string,
) => {
  const response = await fetch(
    `${BASE_URL}/bus/search?from=${encodeURIComponent(
      from,
    )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(
      date,
    )}&type=${encodeURIComponent(type)}`,
  );
  if (!response.ok) {
    throw new Error('Failed to load buses.');
  }
  const data = await response.json();

  return data.data || [];
};
