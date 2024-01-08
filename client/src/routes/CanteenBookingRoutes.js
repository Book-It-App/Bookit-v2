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

const CanteenBookingRoutes = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (<>
  
    {/* <UserContext.Provider value={{ state, dispatch }}> */}
<Navbar/>
    <Routes>
          {/* Hall booking routes starts here */}

{/* for comming soon page */}
<Route path="/" element={<CommingSoon />} />
          {/* <Route path="/" element={state.userType === "admin" ? <AdminDashboard /> : state.userType === "faculty" ? <FacultyDashboard /> : process.env.REACT_APP_HOD_FEATURE &&  state.userType === "hod" ? <HodDashboard />  : <Login />} /> */}
          
          
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

export default CanteenBookingRoutes;
