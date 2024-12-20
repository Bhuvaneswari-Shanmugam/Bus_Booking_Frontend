import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TripApi = createApi({
  reducerPath: 'tripApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token'); 
      console.log(token,"token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    searchTrips: builder.mutation({
      query: ({ pickupPoint, destinationPoint, pickupTime }) => ({
        url: `trip/search`,
        params: { pickupPoint, destinationPoint, pickupTime }, 
        method: 'GET',
      }),
    }),
  }),
});

export const { useSearchTripsMutation } = TripApi;



