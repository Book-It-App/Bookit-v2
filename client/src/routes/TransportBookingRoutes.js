import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createContext, useReducer } from "react";

import Transports from "../components/transportBookingSystem/transports/Transports";
import BookingForm from "../components/transportBookingSystem/transportBookings/BookingForm";
import BookingsAdmin from "../components/transportBookingSystem/transportBookings/BookingsAdmin";
import BookingsHod from "../components/transportBookingSystem/transportBookings/BookingsHod";
import AdminDashboard from "../components/transportBookingSystem/transportDashboard/AdminDashboard";
import FacultyDashboard from "../components/transportBookingSystem/transportDashboard/FacultyDashboard";
import BookingFaculty from "../components/transportBookingSystem/transportBookings/BookingsFaculty";
import HodDashboard from "../components/transportBookingSystem/transportDashboard/HodDashboard";
import TransportsAdmin from "../components/transportBookingSystem/transports/TransportsAdmin";
import { CalendarView } from "../components/transportBookingSystem/CalendarView";
import TransportsEdit from "../components/transportBookingSystem/transports/TransportsEdit";
import TransportForm from "../components/transportBookingSystem/transports/TransportForm";
import BookingUpdateFrom from "../components/transportBookingSystem/transportBookings/BookingUpdateForm"
import Events from "../components/transportBookingSystem/transportBookings/Events";
import BookingsView from "../components/transportBookingSystem/transportBookings/BookingView";
import { initialState, reducer } from "../reducer/UseReducer";
import Login from "../components/auth/Login";
import About from "../components/About";
import Contact from "../components/Contact";

import Unauthorized from '../components/Unauthorized';
import Navbar from '../components/transportBookingSystem/Navbar';
export const UserContext = createContext();

const TransportBookingRoutes = (props) => {

  // const [props.userState, dispatch] = useReducer(reducer, initialState)
  return (<>
  
    {/* <UserContext.Provider value={{ props.userState, dispatch }}> */}
<Navbar/>
    <Routes>
          {/* Transport booking routes starts here */}
          <Route path="/" element={props.userState.userType === "admin" ? <AdminDashboard /> : props.userState.userType === "faculty" ? <FacultyDashboard /> : <Unauthorized />  } />
          {/* <Route path="/events" element={<Events />} />*/}
          <Route path="/calendar" element={<CalendarView />} /> 
          <Route path="/transports" element={props.userState.userType === "admin" ? <TransportsAdmin/> : <Transports />}/>
          <Route exact path="/transports/:transportId/:transportName" element={props.userState.userType === "admin" ?<TransportsEdit /> : <Unauthorized />} />
          <Route path="/transportForm" element={props.userState.userType === "admin" ?<TransportForm /> : <Unauthorized />} />
          <Route path="/bookings" element={props.userState.userType === "admin" ? <BookingsAdmin/> : props.userState.userType === "faculty" ? <BookingFaculty/> :   <Unauthorized />} />
          {/* <Route exact path="/bookingForm/:transportId/:transportName" element={<BookingForm />} /> */}
          <Route exact path="/bookingForm" element={<BookingForm />} />
          {/* <Route exact path="/bookingsEdit/:bookingId" element={props.userState.userType === "admin" ? <BookingUpdateFrom/>  :  <Unauthorized />} /> */}
          <Route exact path="/bookingsEdit/:bookingId" element={ <BookingUpdateFrom/>  } />
          <Route exact path="/bookingsView/:bookingId" element={<BookingsView/>} />
          {/* Transport booking routes ends here */}
          <Route path="/profile" element={<About />} />
          <Route path="/contact" element={<Contact />} />
    </Routes>
    {/* </UserContext.Provider> */}

    </>
  );
};

export default TransportBookingRoutes;
