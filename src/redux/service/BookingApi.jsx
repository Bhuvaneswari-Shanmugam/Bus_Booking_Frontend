import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/booking', 
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    createBooking: builder.mutation({
      query: ({ pickupPoint, destinationPoint, pickupTime, busNumber, busType, bookedNoOfSeats, perSeatAmount, totalAmount }) => ({
        url: '/create',
        method: 'POST',
        params: {
          pickupPoint,
          destinationPoint,
          pickupTime,
          busNumber,
          busType,
          bookedNoOfSeats,
          perSeatAmount,
          totalAmount,
        },
      }),
    }),

    deleteBooking: builder.mutation({
      query: ({ busNumber, seatNumbers }) => ({
        url: '/delete',
        method: 'DELETE',
        params: {
          busNumber,
          seatNumbers,
        },
      }),
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: '/fetch-all-booking-by-userId',
        method: 'GET',
      }),
    }),

    updateBooking: builder.mutation({
      query: ({ pickupPoint, destinationPoint, pickupTime, busNumber, busType, bookedNoOfSeats, perSeatAmount, totalAmount }) => ({
        url: '/update-booking',
        method: 'PUT',
        params: {
          pickupPoint,
          destinationPoint,
          pickupTime,
          busNumber,
          busType,
          bookedNoOfSeats,
          perSeatAmount,
          totalAmount,
        },
      }),
    }),

    getAvailableBuses: builder.query({
      query: (busId) => ({
        url: `/available-buses`,  
        method: 'GET',
        params:{busId}
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
  useGetAvailableBusesQuery,
} = BookingApi;
