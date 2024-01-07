import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createContext, useReducer } from "react";
import axios from "axios"
import Halls from "../components/hallBookingSystem/halls/Halls";
import BookingForm from "../components/hallBookingSystem/hallBookings/BookingForm";
import BookingsAdmin from "../components/hallBookingSystem/hallBookings/BookingsAdmin";
import BookingsHod from "../components/hallBookingSystem/hallBookings/BookingsHod";
import AdminDashboard from "../components/hallBookingSystem/hallDashboard/AdminDashboard";
import FacultyDashboard from "../components/hallBookingSystem/hallDashboard/FacultyDashboard";
import BookingFaculty from "../components/hallBookingSystem/hallBookings/BookingsFaculty";
import HodDashboard from "../components/hallBookingSystem/hallDashboard/HodDashboard";
import HallsAdmin from "../components/hallBookingSystem/halls/HallsAdmin";
import { CalendarView } from "../components/hallBookingSystem/CalendarView";
import HallsEdit from "../components/hallBookingSystem/halls/HallsEdit";
import HallForm from "../components/hallBookingSystem/halls/HallForm";
import BookingUpdateFrom from "../components/hallBookingSystem/hallBookings/BookingUpdateForm"
import Events from "../components/hallBookingSystem/hallBookings/Events";
import BookingsView from "../components/hallBookingSystem/hallBookings/BookingView";
import { initialState, reducer } from "../reducer/UseReducer";
import Login from "../components/auth/Login";
import About from "../components/About";
import Contact from "../components/Contact";

import Unauthorized from '../components/Unauthorized';
import Navbar from '../components/hallBookingSystem/Navbar';
export const UserContext = createContext();

const HallBookingRoutes = () => {

//   const token = (localStorage.getItem("jwtoken"))
// console.log(token)

//   axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

//   axios.defaults.withCredentials = true;

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state)
  return (<>
  
    {/* <UserContext.Provider value={{ state, dispatch }}> */}
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
    {/* </UserContext.Provider> */}

    </>
  );
};

export default HallBookingRoutes;
