import { api } from '../apiClient';

export const bookTicket = async (bookingData: any) => {
  const response = await api('/ticket/book', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });

  return response;
};
