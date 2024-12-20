import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CustomerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/api/v1/auth/',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: `retrieve-all-user?page=${page}&size=${size}`,
        method: 'GET',
      }),

    }),
  }),
});

export const { useFetchAllUsersQuery } = CustomerApi;
