import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BookingDetailsApi = createApi({
  reducerPath: 'bookingDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/booking/',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllBooking: builder.query({
      query: ({ page=0, size=10 }) => ({
        url: `retrieve-all-bookings?page=${page}&size=${size}`,
        method: 'GET',
      }),
    }),
    
  }),
});

export const { useFetchAllBookingQuery } = BookingDetailsApi;
