import { api } from '../apiClient';

export const bookTicket = async (bookingData: any) => {
  const data = await api('/ticket/book', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });

  return data.ticket;
};

export const fetchUserTickets = async (status: string) => {
  const data = await api(
    `/ticket/my-tickets?status=${encodeURIComponent(status)}`,
  );

  return data.tickets || [];
};
