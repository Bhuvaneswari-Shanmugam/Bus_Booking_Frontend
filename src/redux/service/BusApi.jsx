import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BusApi = createApi({
    reducerPath: 'busApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/' }), 
    endpoints: (builder) => ({
      
        getAvailableSeatCount: builder.query({
            query: ({ number, type }) => ({
                url: 'bus/search',
                method: 'GET',
                params: { number, type },
            }),
        }),
    }),
});


export const { useGetAvailableSeatCountQuery } = BusApi;
