import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constant/Index';

export const UsersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("Token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `get-user-detail/${id}`,
        method: 'GET',
      }),
    }),


    getAllUsers: builder.query({
      query: () => ({
        url: 'get-all-users',
        method: 'GET',
      }),
    }),


    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-user/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),


    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetUserByIdQuery,
  useGetAllUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} = UsersApi;
