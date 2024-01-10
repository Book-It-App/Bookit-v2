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

const HallBookingRoutes = (props) => {

//   const token = (localStorage.getItem("jwtoken"))
// console.log(token)

//   axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

//   axios.defaults.withCredentials = true;

  // const [props.userState, dispatch] = useReducer(reducer, initialState);
  console.log(props.userState)
  return (<>
  
    {/* <UserContext.Provider value={{ props.userState, dispatch }}> */}
    <Navbar/>
    <Routes>
          {/* Hall booking routes starts here */}
          <Route path="/" element={props.userState.userType === "admin" ? <AdminDashboard /> : props.userState.userType === "faculty" ? <FacultyDashboard /> : process.env.REACT_APP_HOD_FEATURE &&  props.userState.userType === "hod" && <HodDashboard />  } />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/halls" element={props.userState.userType === "admin" ? <HallsAdmin/> : <Halls />}/>
          <Route exact path="/halls/:hallId/:hallName" element={props.userState.userType === "admin" ?<HallsEdit /> : <Unauthorized />} />
          <Route exact path="/bookingsEdit/:bookingId" element={props.userState.userType === "admin" ? <BookingUpdateFrom/>  : process.env.REACT_APP_HOD_FEATURE &&  props.userState.userType === "hod" ? <BookingUpdateFrom/>  : <Unauthorized />} />
          <Route path="/hallForm" element={props.userState.userType === "admin" ?<HallForm /> : <Unauthorized />} />
          <Route path="/bookings" element={props.userState.userType === "admin" ? <BookingsAdmin/> : props.userState.userType === "faculty" ? <BookingFaculty/> :  process.env.REACT_APP_HOD_FEATURE && props.userState.userType === "hod" ? <BookingsHod/>  : <Unauthorized />} />
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
