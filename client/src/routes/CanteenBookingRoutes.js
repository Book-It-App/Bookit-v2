import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createContext, useReducer } from "react";

import Canteens from "../components/canteenBookingSystem/canteens/Canteens";
import BookingForm from "../components/canteenBookingSystem/canteenBookings/BookingForm";
import BookingsAdmin from "../components/canteenBookingSystem/canteenBookings/BookingsAdmin";
import BookingsHod from "../components/canteenBookingSystem/canteenBookings/BookingsHod";
import AdminDashboard from "../components/canteenBookingSystem/canteenDashboard/AdminDashboard";
import FacultyDashboard from "../components/canteenBookingSystem/canteenDashboard/FacultyDashboard";
import BookingFaculty from "../components/canteenBookingSystem/canteenBookings/BookingsFaculty";
import HodDashboard from "../components/canteenBookingSystem/canteenDashboard/HodDashboard";
import CanteensAdmin from "../components/canteenBookingSystem/canteens/CanteensAdmin";
import { CalendarView } from "../components/canteenBookingSystem/CalendarView";
import CanteensEdit from "../components/canteenBookingSystem/canteens/CanteensEdit";
import CanteenForm from "../components/canteenBookingSystem/canteens/CanteenForm";
import BookingUpdateFrom from "../components/canteenBookingSystem/canteenBookings/BookingUpdateForm"
import Events from "../components/canteenBookingSystem/canteenBookings/Events";
import BookingsView from "../components/canteenBookingSystem/canteenBookings/BookingView";
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
          {/* Canteen booking routes starts here */}

{/* for comming soon page */}
{/* <Route path="/" element={<CommingSoon />} /> */}
          <Route path="/" element={props.userState.userType === "admin" ? <AdminDashboard /> : props.userState.userType === "faculty" ? <FacultyDashboard /> : process.env.REACT_APP_HOD_FEATURE &&  props.userState.userType === "hod" ? <HodDashboard />  : <Login />} />
          
          
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/canteens" element={props.userState.userType === "admin" ? <CanteensAdmin/> : <Canteens />}/>
          <Route exact path="/canteens/:canteenId/:canteenName" element={props.userState.userType === "admin" ?<CanteensEdit /> : <Unauthorized />} />
          <Route exact path="/bookingsEdit/:bookingId" element={props.userState.userType === "admin" ? <BookingUpdateFrom/>  : process.env.REACT_APP_HOD_FEATURE &&  props.userState.userType === "hod" ? <BookingUpdateFrom/>  : <Unauthorized />} />
          <Route path="/canteenForm" element={props.userState.userType === "admin" ?<CanteenForm /> : <Unauthorized />} />
          <Route path="/bookings" element={props.userState.userType === "admin" ? <BookingsAdmin/> : props.userState.userType === "faculty" ? <BookingFaculty/> :  process.env.REACT_APP_HOD_FEATURE && props.userState.userType === "hod" ? <BookingsHod/>  : <Unauthorized />} />
          <Route exact path="/bookingForm/" element={<BookingForm />} />
          <Route exact path="/bookingForm/:canteenId/:canteenName" element={<BookingForm />} />
          <Route exact path="/bookingsView/:bookingId" element={<BookingsView/>} />
          {/* Canteen booking routes ends here */}
          <Route path="/profile" element={<About />} />
          <Route path="/contact" element={<Contact />} />
    </Routes>
    {/* </UserContext.Provider> */}

    </>
  );
};

export default CanteenBookingRoutes;
