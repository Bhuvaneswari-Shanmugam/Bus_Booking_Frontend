import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';
import Footer from './components/Footer';
import SignIn from './auth/SignIn';
import Signup from './auth/Signup';
import Home from './auth/Home';
import AdminLayout from './components/AdminLayout ';
import Booking from './pages/booking/Booking';
import UpdateBooking from './pages/booking/UpdateBooking';
import AllBookingDetails from './pages/booking/AllBookingDetails';
import SleeperBus from './pages/bus/SleeperBus';
import AcBus from './pages/bus/AcBus';
import BusDetails from './pages/bus/BusDetails';
import NonAcBus from './pages/bus/NonAcBus';
import AvailableBuses from './pages/bus/listOfBuses';
import Profile from './pages/customer/Profile';
import UserProfile from './pages/customer/UserProfile';
import CustomerDetails from './pages/customer/CustomerDetails';
import SeatManagement from './pages/seat/SeatManagement';
import TripDetails from './pages/trip/TripDeatils';
import BookingDetails from './pages/booking/BookingDetails'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>Page not found</h1>} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/sleeper-bus-booking" element={<SleeperBus />} />
          <Route path="/buses" element={< AvailableBuses />} />
          <Route path="/ac-bus-booking" element={< AcBus />} />
          <Route path="/non-ac-bus-booking" element={< NonAcBus />} />
          <Route path="/edit-booking/:id" element={<UpdateBooking />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/booking-details" element={<BookingDetails/>}/>
        
         
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<CustomerDetails />} />
            <Route path="/customer-details" element={<CustomerDetails />} />
            <Route path="/bus-details" element={<BusDetails />} />
            <Route path="/trip-details" element={<TripDetails />} />
            <Route path="/all-booking-details" element={<AllBookingDetails />} />
            <Route path="/seat" element={<SeatManagement />} />
            
          </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
