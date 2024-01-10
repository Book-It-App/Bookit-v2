import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createContext, useReducer } from "react";

import Halls from "../components/canteenBookingSystem/halls/Halls";
import BookingForm from "../components/canteenBookingSystem/hallBookings/BookingForm";
import BookingsAdmin from "../components/canteenBookingSystem/hallBookings/BookingsAdmin";
import BookingsHod from "../components/canteenBookingSystem/hallBookings/BookingsHod";
import AdminDashboard from "../components/canteenBookingSystem/hallDashboard/AdminDashboard";
import FacultyDashboard from "../components/canteenBookingSystem/hallDashboard/FacultyDashboard";
import BookingFaculty from "../components/canteenBookingSystem/hallBookings/BookingsFaculty";
import HodDashboard from "../components/canteenBookingSystem/hallDashboard/HodDashboard";
import HallsAdmin from "../components/canteenBookingSystem/halls/HallsAdmin";
import { CalendarView } from "../components/canteenBookingSystem/CalendarView";
import HallsEdit from "../components/canteenBookingSystem/halls/HallsEdit";
import HallForm from "../components/canteenBookingSystem/halls/HallForm";
import BookingUpdateFrom from "../components/canteenBookingSystem/hallBookings/BookingUpdateForm"
import Events from "../components/canteenBookingSystem/hallBookings/Events";
import BookingsView from "../components/canteenBookingSystem/hallBookings/BookingView";
import { initialState, reducer } from "../reducer/UseReducer";
import Login from "../components/auth/Login";
import About from "../components/About";
import Contact from "../components/Contact";

import Unauthorized from '../components/Unauthorized';
import Navbar from '../components/canteenBookingSystem/Navbar';
import CommingSoon from '../components/CommingSoon';
export const UserContext = createContext();

const CanteenBookingRoutes = (props) => {

  // const [props.userState, dispatch] = useReducer(reducer, initialState)
  return (<>
  
    {/* <UserContext.Provider value={{ props.userState, dispatch }}> */}
<Navbar/>
    <Routes>
          {/* Hall booking routes starts here */}

{/* for comming soon page */}
<Route path="/" element={<CommingSoon />} />
          {/* <Route path="/" element={props.userState.userType === "admin" ? <AdminDashboard /> : props.userState.userType === "faculty" ? <FacultyDashboard /> : process.env.REACT_APP_HOD_FEATURE &&  props.userState.userType === "hod" ? <HodDashboard />  : <Login />} /> */}
          
          
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

export default CanteenBookingRoutes;
