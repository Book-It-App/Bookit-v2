import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
// importing components
import axios from "axios"
import Navbar from "./components/Navbar";
// import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";

import { initialState, reducer } from "./reducer/UseReducer";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordReset from "./components/auth/PasswordReset";

import ForgotPassword from "./components/auth/ForgotPassword";
import VerifySuccess from "./components/auth/VerifySuccess";
// import Unauthorized from "./components/Unauthorized";
import HallBookingRoutes from "./routes/HallBookingRoutes";
import TransportBookingRoutes from "./routes/TransportBookingRoutes";
import CanteenBookingRoutes from "./routes/CanteenBookingRoutes";

import MasterPage from "./components/MasterPage";
import CommingSoon from "./components/CommingSoon";
import Maintenance from "./components/Maintenance";



export const UserContext = createContext();
const App = () => {


      const token = (localStorage.getItem("jwtoken"))


      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  
      axios.defaults.withCredentials = true;
  
    
    const [state, dispatch] = useReducer(reducer, initialState)
console.log(state)


const isUnderMaintenance = process.env.REACT_APP_MAINTENANCE === 'true';

if (isUnderMaintenance) {
  return <Maintenance />;
}

  return (

    <>

      <UserContext.Provider value={{ state, dispatch }}>


        {/* <Navbar /> */}
        <Routes>

        <Route path="/" element={<><Navbar />{ state.user ? <MasterPage /> : <Login />}</>} />


        <Route path="/howtouse" element={<><Navbar /><CommingSoon /></>} />
          <Route path="/profile" element={<><Navbar /><About /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/logout" element={<><Navbar /><Logout /></>} />
          <Route path="/passwordReset" element={<><Navbar /><PasswordReset /></>} />
          <Route path="/forgotPassword/:id/:token" element={<><Navbar /><ForgotPassword /></>} />
          <Route path="/verifyEmail/:id/:token" element={<><Navbar /><VerifySuccess/></>} />       
          <Route path="/*" element={<><Navbar /><ErrorPage /></>} />
          
         <Route
  path="/hall-booking-system/*"
  element={
    state.user && state.userType === "admin" && state.adminFor === "hall" ? (
      <HallBookingRoutes userState={state} />
    ) : (
      <HallBookingRoutes userState={{ ...state, userType: "faculty" }} />
    )
  }
/>


<Route
  path="/transport-booking-system/*"
  element={
    state.user && state.userType === "admin" && state.adminFor === "transport" ? (
      <TransportBookingRoutes userState={state} />
    ) : (
      <TransportBookingRoutes userState={{ ...state, userType: "faculty" }} />
    )
  }
/>

<Route
  path="/canteen-booking-system/*"
  element={
    state.user && state.userType === "admin" && state.adminFor === "canteen" ? (
      <CanteenBookingRoutes userState={state} />
    ) : (
      <CanteenBookingRoutes userState={{ ...state, userType: "faculty" }} />
    )
  }
/>
          {/* <Route path="/hall-booking-system/*" element={<HallBookingRoutes  userState={state}/>} /> */}
        {/* <Route path="/transport-booking-system/*" element={<TransportBookingRoutes userState={state}/>} /> */}
        {/* <Route path="/canteen-booking-system/*" element={<CanteenBookingRoutes userState={state}/>} /> */}

   

        </Routes>
        
      <Footer/>
      </UserContext.Provider>


      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
