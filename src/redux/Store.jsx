import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from '../redux/service/SignupApi';
import {UsersApi} from '../redux/service/UserApi';
import { TripApi } from './service/TripApi';
import { BusApi } from './service/BusApi';
import {BookingApi,} from './service/BookingApi';



const store = configureStore({
  reducer:{
    [SignupApi.reducerPath]:SignupApi.reducer,
    [UsersApi.reducerPath]:UsersApi.reducer,
    [TripApi.reducerPath]:TripApi.reducer,
    [BusApi.reducerPath]:BusApi.reducer,
    [BookingApi.reducerPath]:BookingApi.reducer
    
},
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({}).concat([SignupApi.middleware, UsersApi.middleware, TripApi.middleware, BusApi.middleware, BookingApi.middleware])
})

export default store;
