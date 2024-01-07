import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createContext, useReducer } from "react";

import Halls from "../components/transportBookingSystem/halls/Halls";
import BookingForm from "../components/transportBookingSystem/hallBookings/BookingForm";
import BookingsAdmin from "../components/transportBookingSystem/hallBookings/BookingsAdmin";
import BookingsHod from "../components/transportBookingSystem/hallBookings/BookingsHod";
import AdminDashboard from "../components/transportBookingSystem/hallDashboard/AdminDashboard";
import FacultyDashboard from "../components/transportBookingSystem/hallDashboard/FacultyDashboard";
import BookingFaculty from "../components/transportBookingSystem/hallBookings/BookingsFaculty";
import HodDashboard from "../components/transportBookingSystem/hallDashboard/HodDashboard";
import HallsAdmin from "../components/transportBookingSystem/halls/HallsAdmin";
import { CalendarView } from "../components/transportBookingSystem/CalendarView";
import HallsEdit from "../components/transportBookingSystem/halls/HallsEdit";
import HallForm from "../components/transportBookingSystem/halls/HallForm";
import BookingUpdateFrom from "../components/transportBookingSystem/hallBookings/BookingUpdateForm"
import Events from "../components/transportBookingSystem/hallBookings/Events";
import BookingsView from "../components/transportBookingSystem/hallBookings/BookingView";
import { initialState, reducer } from "../reducer/UseReducer";
import Login from "../components/auth/Login";
import About from "../components/About";
import Contact from "../components/Contact";

import Unauthorized from '../components/Unauthorized';
import Navbar from '../components/transportBookingSystem/Navbar';
export const UserContext = createContext();

const TransportBookingRoutes = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (<>
  
    <UserContext.Provider value={{ state, dispatch }}>
<Navbar/>
    <Routes>
          {/* Hall booking routes starts here */}
          <Route path="/" element={state.userType === "admin" ? <AdminDashboard /> : state.userType === "faculty" ? <FacultyDashboard /> : process.env.REACT_APP_HOD_FEATURE &&  state.userType === "hod" ? <HodDashboard />  : <Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/halls" element={state.userType === "admin" ? <HallsAdmin/> : <Halls />}/>
          <Route exact path="/halls/:hallId/:hallName" element={state.userType === "admin" ?<HallsEdit /> : <Unauthorized />} />
          <Route exact path="/bookingsEdit/:bookingId" element={state.userType === "admin" ? <BookingUpdateFrom/>  : process.env.REACT_APP_HOD_FEATURE &&  state.userType === "hod" ? <BookingUpdateFrom/>  : <Unauthorized />} />
          <Route path="/hallForm" element={state.userType === "admin" ?<HallForm /> : <Unauthorized />} />
          <Route path="/bookings" element={state.userType === "admin" ? <BookingsAdmin/> : state.userType === "faculty" ? <BookingFaculty/> :  process.env.REACT_APP_HOD_FEATURE && state.userType === "hod" ? <BookingsHod/>  : <Unauthorized />} />
          <Route exact path="/bookingForm/:hallId/:hallName" element={<BookingForm />} />
          <Route exact path="/bookingsView/:bookingId" element={<BookingsView/>} />
          {/* Hall booking routes ends here */}
          <Route path="/profile" element={<About />} />
          <Route path="/contact" element={<Contact />} />
    </Routes>
    </UserContext.Provider>

    </>
  );
};

export default TransportBookingRoutes;
