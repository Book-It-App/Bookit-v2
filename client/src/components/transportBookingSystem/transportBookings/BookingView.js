import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";
import { parseISO, format } from "date-fns";
import { UserContext } from "../../../App";

import {
  RequestSent,
  ApprovedByAdmin,
  ApprovedByHod,
  RejectedByAdmin,
  RejectedByHod,
} from "../../Steps";
import { DepartmentList, InstitutionList } from "../../Institutions";
const BookingsView = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  //consolelog(bookingId);
  const [isLoading, setIsLoading] = useState(true);
  // const [showRejectionModal, setShowRejectionModal] = useState(false);
  // const [selectedBookingId, setSelectedBookingId] = useState("");
  const [bookingData, setBookingData] = useState({
    // noOfVehicle: null,
    // bookedTransportId: [],
  });
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  // const [driverDetails, setDriverDetails] = useState({
  //   nameOfDriver: "",
  //   mobNoOfDriver: "",
  // });

  const [vehicles, setVehicles] = useState([]);

  const { state } = useContext(UserContext);

  //consolelog(state.userType);

  const openRejectionModal = (bookingId) => {
    setShowRejectionModal(true);
  };

  const openApprovalModal = (bookingId) => {
    setBookingData({ ...bookingData,
      //  noOfVehicle: 1 ,
      //  bookedTransportId: [...bookingData.bookedTransportId, {}]
      });
    setShowApprovalModal(true);
  };

  const closeRejectionModal = () => {
    setShowRejectionModal(false);
    setRejectionReason("");
  };

  const closeApprovalModal = () => {
    setShowApprovalModal(false);
    // setDriverDetails({});
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/transport-booking-system/transports`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const vehicleList = response.data.transports; // Modify this based on your API response structure

      setVehicles(vehicleList);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const getbookingById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsView/${bookingId}`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.booking;
      console.log(data);
      setBookingData(data);
      setIsLoading(false);
      console.log(data) 
      console.log(data.noOfVehicle) 
    } catch (error) {
      navigate("/");
      //consoleerror(error);
    }
  };

  //consolelog(bookingData);

  const updateBooking = async (bookingId, isApproved) => {
    if (isApproved === "Rejected By Admin") {
      if (rejectionReason.trim() === "") {
        toast.error("Please provide a reason for rejection.");
        return;
      } else {
        setRejectionReason(null);
      }
    }
    // const {  nameOfDriver, mobNoOfDriver } = driverDetails;
    const {
      bookedTransportId,
      noOfVehicle,
      // bookedTransportName,
      // nameOfDriver,
      // mobNoOfDriver,
    } = bookingData;
    console.log(bookingData);
    if (isApproved === "Approved By Admin") {

        if (noOfVehicle === 0) {
    toast.error("Please select at least one vehicle.");
    return;
  }

      const isAnyDetailEmpty = bookedTransportId.some((transport) => {
        // Ensure that mobNoOfDriver is a string before calling trim()
        if (!transport.number ) {
          return true; // Return true to indicate that the detail is empty
        }else{

          const mobNoOfDriver = transport.mobNoOfDriver ? transport.mobNoOfDriver.toString() : '';
          return !transport.nameOfDriver.trim() || !mobNoOfDriver.trim();
        }
      });
      
      if (isAnyDetailEmpty) {
        toast.error("Please fill all details for each booked transport.");
        return;
      }
      

      
      // if (nameOfDriver.trim() === "" && mobNoOfDriver.trim() === "") {
      //   toast.error("Please fill all details.");
      //   return;
      // }
      // else if (mobNoOfDriver.length !== 10) {
      //   console.log(mobNoOfDriver.length)
      //   toast.error("Please enter a valid mobile number.");
      //   return;
      // }
    }
    //consolelog(isApproved);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsEdit/${bookingId}`,
        {



          bookedTransportId: bookedTransportId.map((transport) => transport._id),
          noOfVehicle: noOfVehicle,

          // bookedTransportId: bookedTransportId._id,
          // bookedTransportName: bookedTransportName,
          isApproved: isApproved,
          // nameOfDriver:
          //   isApproved === "Rejected By Admin" ? null : nameOfDriver,
          // mobNoOfDriver:
          //   isApproved === "Rejected By Admin" ? null : mobNoOfDriver,
          rejectionReason:
            isApproved === "Approved By Admin" ? null : rejectionReason,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // const data = response.data;
      //consolelog(data);
      closeRejectionModal();
      closeApprovalModal();
      getbookingById();
        
      toast.success(`Request ${isApproved} Successfull!`);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 422) {
        const data = error.response.data;
        // Handle validation errors
        // You can set specific error messages for different fields if needed
        if (data && data.error) {
          const errorMessage = data.error;
          setIsLoading(false);
          toast.error(errorMessage);
        }
      }
      //consolelog(error);
    }
  };

  const handleEditClick = (bookingId) => {
    navigate(`/transport-booking-system/bookingsEdit/${bookingId}`);
  };

  // const handleDeleteModal = (bookingId) => {
  //   setSelectedBookingId(bookingId);
  //   setShowRejectionModal(true);
  // };
  // const handleDeleteBooking = () => {
  //   deleteBooking(selectedBookingId);
  // };

  // const handleDriverDetails = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   console.log(bookingData)
  //   // setDriverDetails({ ...driverDetails, [name]: value });
  //   setBookingData({ ...bookingData, [name]: value });
  // };

  // const handleNoOfVehicle = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   console.log(bookingData);
  //   // setDriverDetails({ ...driverDetails, [name]: value });
  //   setBookingData({ ...bookingData, [name]: value });
  // };

  const handleNoOfVehicle = (e) => {
    const name = "noOfVehicle";
    // const value = bookingData.bookedTransportId.length;
    // const value = bookingData.noOfVehicle + 1;
  
    let value = bookingData.noOfVehicle || 0; // Initialize with 0 if it's NaN or undefined
  
    // Increment the value by 1
    value += 1;
    setBookingData({
      ...bookingData,
      [name]: value,
      bookedTransportId: [...bookingData.bookedTransportId, {}],
    });

    console.log(bookingData);
  };
  // const handleDriverDetails = (e, index) => {
  //   const { name, value } = e.target;
  //   setBookingData((prevData) => {
  //     const updatedTransportId = [...prevData.bookedTransportId];
  //     updatedTransportId[index] = {
  //       ...updatedTransportId[index],
  //       [name]: value,
  //     };
  //     return {
  //       ...prevData,
  //       bookedTransportId: updatedTransportId,
  //     };
  //     console.log(bookingData)
  //   });
  // };


  const handleRemoveVehicle = (vehicleId) => {
  const updatedTransportId = bookingData.bookedTransportId.filter(vehicle => vehicle._id !== vehicleId);

  setBookingData({
    ...bookingData,
    bookedTransportId: updatedTransportId,
    noOfVehicle: updatedTransportId.length, // Update the number of vehicles
  });
};
  // const handleRemoveVehicle = (index) => {
  //   const updatedTransportId = [...bookingData.bookedTransportId];

  //   if (updatedTransportId.length > 1) {
  //     updatedTransportId.splice(index, 1);
  //     setBookingData({ ...bookingData, bookedTransportId: updatedTransportId , noOfVehicle: bookingData.noOfVehicle - 1});
  //   }
  
  
  // };


  const handleDriverDetails = (e, index) => {
    const { name, value } = e.target;

    // Create a copy of the state
    const updatedBookingData = { ...bookingData };

    // Check if bookedTransportId[index] exists, if not, create an empty object
    if (!updatedBookingData.bookedTransportId[index]) {
      updatedBookingData.bookedTransportId[index] = {};
    }

    if (name === `bookedTransportId[${index}].nameOfDriver` || name === `bookedTransportId[${index}].mobNoOfDriver`) {
      updatedBookingData.bookedTransportId[index][name.split('.')[1]] = value;
    }
    // Find the selected transport (vehicle) based on the ID
    const selectedTransport = vehicles.find((vehicle) => vehicle._id === value);


    if (selectedTransport) {
      // Check if the selected transport is already in bookedTransportId
      const isAlreadyBooked = updatedBookingData.bookedTransportId.some(
        (booking) => booking && booking._id === selectedTransport._id
      );
  
      if (isAlreadyBooked) {
        // Display toast or perform other actions for already booked transport
        // Replace the following line with your toast or notification logic
        toast.error(`${selectedTransport.number} ${selectedTransport.name} is already selected.`);

        // console.log(`Transport with ID ${selectedTransport._id} is already booked.`);
      } else {
        updatedBookingData.bookedTransportId[index] = selectedTransport;
      }
    }
   
    setBookingData(updatedBookingData);
  };

  useEffect(() => {
   
    getbookingById();
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleVehicleSelect = (e) => {
  //   const selectedVehicleId = e.target.value;
  //   const selectedVehicleObject = vehicles.find(
  //     (vehicle) => vehicle._id === selectedVehicleId
  //   );
  //   console.log(selectedVehicleId);
  //   setBookingData((bookingData) => ({
  //     ...bookingData,
  //     bookedTransportId: selectedVehicleObject,
  //     bookedTransportName: selectedVehicleObject.name,
  //     nameOfDriver: selectedVehicleObject.nameOfDriver,
  //     mobNoOfDriver: selectedVehicleObject.mobNoOfDriver,
  //   }));
  //   console.log(bookingData);
  // };
  const institutionName =
    InstitutionList[bookingData.institution] || bookingData.institution;
  const departmentName =
    DepartmentList[bookingData.department] || bookingData.department;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                View Booking
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                View <span className="text-indigo-600">Booking </span>
              </h3>
            </div>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-event-manager">
                    Booking Faculty/Staff
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-manager">
                    {bookingData.eventManager}
                  </p>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-event-date">
                    Booking Type
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date">
                    {bookingData.eventDateType === "multiple"
                      ? "Multiple Days"
                      : // : event.eventDateType === "half"
                        // ? "Half Day"
                        // : "Full Day"}
                        "Single Day"}
                  </p>
                </div>
              </div>

              {bookingData.eventDateType === "multiple" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-start-time">
                      Booking Start Date
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time">
                      {format(
                        new Date(bookingData.eventStartDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-end-time">
                      Booking End Date
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time">
                      {format(
                        new Date(bookingData.eventEndDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap -mx-3 mb-6">
                {(bookingData.eventDateType === "full" ||
                  bookingData.eventDateType === "half") && (
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-department">
                      Booking date
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-department">
                      {format(
                        new Date(bookingData.eventDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                )}

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-transport-name">
                    Vehicle Type
                  </h1>
                  <p
                    className="appearance-none block w-full capitalize text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-transport-name">
                    {bookingData.vehicleType}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-start-time">
                    Start Time
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-start-time">
                    {format(
                      parseISO(bookingData.startTime.slice(0, -1)),
                      "hh:mm aa"
                    )}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-end-time">
                    End Time
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-end-time">
                    {format(
                      parseISO(bookingData.endTime.slice(0, -1)),
                      "hh:mm aa"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-no-of-person">
                    No. Of Person Traveling
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-no-of-person">
                    {bookingData.noOfPerson}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-selfOrGuest">
                    Booking for 
                  </h1>
                  <p
                    className="appearance-none block w-full capitalize text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-self-or-guest">
                    {bookingData.selfOrGuest}
                  </p>
                </div>
              </div>

              {bookingData.selfOrGuest === "guest" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-name-of-guest">
                      Name Of Guest
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-name-of-guest">
                         {bookingData.naneOfGuest
                      ? bookingData.naneOfGuest
                      : "Not Provided"}
               
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-mobNoOfGuest">
                      Mob. No. Of Guest
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-mob-no-of-guest">
                          {bookingData.mobNoOfGuest
                      ? bookingData.mobNoOfGuest
                      : "Not Provided"}
                   
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap -mx-3 mb-6">
                {/* {bookingData.selfOrGuest === "guest" && ( */}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-round-or-oneway">
                      Round Or One-Way Trip
                    </h1>
                    <p
                      className="appearance-none block w-full capitalize text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-round-or-oneway">
                      {bookingData.roundOrOneway}
                    </p>
                  </div>
                {/* )} */}

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-outstaion-or-local">
                    Outstaion or Local
                  </h1>
                  <p
                    className="appearance-none block w-full capitalize  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-outstaion-or-local">
                    {bookingData.outstationOrLocal}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-pickup-location">
                    Pickup Location
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-pickup-location">
                    {bookingData.pickupLocation}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-drop-location">
                    Drop Location
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-drop-location">
                    {bookingData.dropLocation}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number">
                    Phone Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number">
                    {bookingData.phoneNumber}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-alt-number">
                    HOD/DIRECTOR EMAIL
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number">
                    {bookingData.hodEmail
                      ? bookingData.hodEmail
                      : "Not Provided"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number">
                    Institution
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number">
                    {bookingData.institution} - {institutionName}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-alt-number">
                    Department
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number">
                    {bookingData.department} - {departmentName}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number">
                    Requested By
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number">
                    {bookingData.userId.name}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-alt-number">
                    Request Created At
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number">
                    {format(
                      parseISO(bookingData.createdAt),
                      "EEEE dd-MM-yyyy hh:mm aa"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-remark">
                    Remark
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-remark">
                    {bookingData.remark ? bookingData.remark : "Not Remark"}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
              </div>

              {bookingData.isApproved === "Approved By Admin" && (
<>
          {bookingData.bookedTransportId.map((transport, index) => (

                <div key={index}>
                   <h1
                    className="block uppercase tracking-wide text-green-700 text-s font-bold mb-2 "
                    htmlFor="grid-remark">
                    Vehicle {index + 1}
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <h1
                        className="block uppercase tracking-wide text-green-700 text-xs font-bold mb-2 "
                        htmlFor="grid-name-of-driver">
                        Name of Driver
                      </h1>
                      <p
                        className="appearance-none block w-full  text-green-700 border border-green-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="grid-name-of-driver">
                        {transport.nameOfDriver}
                      </p>
                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <h1
                        className="block uppercase tracking-wide text-green-700 text-xs font-bold mb-2 "
                        htmlFor="grid-mob-no-of-dvier">
                        Mob. No. of Driver
                      </h1>
                      <p
                        className="appearance-none block w-full  text-green-700 border border-green-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="grid-mob-no-of-dvier">
                        {transport.mobNoOfDriver}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <h1
                        className="block uppercase tracking-wide text-green-700 text-xs font-bold mb-2 "
                        htmlFor="grid-vehicle-number">
                        Vehicle Number
                      </h1>
                      <p
                        className="appearance-none block w-full  text-green-700 border border-green-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="grid-vehicle-number">
                        {
                          transport.number}
                      </p>
                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <h1
                        className="block uppercase tracking-wide text-green-700 text-xs font-bold mb-2 "
                        htmlFor="grid-vehicle-name">
                        Vehicle Name
                      </h1>
                      <p
                        className="appearance-none block w-full  text-green-700 border border-green-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="grid-vehicle-name">
                        {transport.name }
                      </p>
                    </div>
                  </div>
                </div>
                        ))}

</>
              )}

              {bookingData.rejectionReason && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-phone-number">
                      Reason For Rejection
                    </h1>
                    <p className="text-s text-red-600	 font-bold">
                      {bookingData.rejectionReason}
                    </p>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                </div>
              )}

              <div className="mt-6 ">
                {/* <div>
                              <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-zinc-700 font-bold ">Status</p>
                            </div> */}
                {bookingData.isApproved === "Approved By Admin" && (
                  <ApprovedByAdmin />
                )}
                {bookingData.isApproved === "Approved By HOD" && (
                  <ApprovedByHod />
                )}
                {bookingData.isApproved === "Rejected By HOD" && (
                  <RejectedByHod />
                )}
                {bookingData.isApproved === "Rejected By Admin" && (
                  <RejectedByAdmin />
                )}
                {bookingData.isApproved === "Request Sent" && <RequestSent />}
              </div>
              <div className="px-5 py-5 text-l flex font-bold  bg-white justify-between border-gray-200">
                {state.userType === "admin" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">
                      Edit
                    </button>

                    <button
                      onClick={() => openApprovalModal(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectionModal(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                      Reject
                    </button>
                  </>
                )}
                {state.userType === "hod" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Approved By HOD")
                      }
                      className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Rejected By HOD")
                      }
                      className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                      Reject
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {showApprovalModal && (
        <div className="fixed top-0 left-0  flex items-center justify-center w-full h-full z-20 bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white p-4 rounded-md shadow-md w-4/5 max-h-full overflow-y-auto">
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold mb-4">Vehicle and Driver Details</h2>
            <button
            onClick={handleNoOfVehicle}
            // value={bookingData.noOfVehicle}
            name="noOfVehicle"
            className="flex self-end bg-indigo-700  hover:bg-indigo-500 rounded border border-indigo-700 text-white  px-4 py-2 ">
             Add Vehicle</button>
        </div>
           <div className="mb-6 w-1/6">
               <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-no-of-vehicles">
                Number of Vehicles
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-no-of-vehicles"
                type="number"
                value={bookingData.noOfVehicle}
                // name="noOfVehicle"
                // onChange={handleNoOfVehicle}
                placeholder="Number of Vehicles"
                // min="1"
                disabled 
                
              />
            </div> 
    
            {Array.from({ length: Math.max(0, Math.floor(bookingData.noOfVehicle))}).map((_, index) => (

                
              <div key={index} className="flex flex-wrap -mx-3 mb-6">
                {/* Vehicle Type Input */}
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={`grid-vehicle-type-${index}`}>
                    Vehicle Type
                  </label>
                  <input
                    className="appearance-none block w-full capitalize bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`grid-vehicle-type-${index}`}
                    type="text"
                    name={`bookedTransportId[${index}].vehicleType`}
                    value={bookingData.vehicleType || ""}
                    disabled
                  />
                </div>

                {/* Select Vehicle Input */}
                <div className="w-full md:w-1/5 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={`grid-transport-name-${index}`}>
                    Select Vehicle
                  </label>

                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`grid-transport-name-${index}`}
                    name={`bookedTransportId[${index}]`}
                    value={bookingData.bookedTransportId[index]?._id || ""}
                    onChange={(e) => handleDriverDetails(e, index)}>
                    <option value="">Select a vehicle</option>
                    {bookingData.vehicleType === "bus"
                      ? vehicles
                          .filter((vehicle) => vehicle.transportType === "bus")
                          .map((bus) => (
                            <option key={bus._id} value={bus._id}>
                              {bus.number} {bus.name}
                            </option>
                          ))
                      : vehicles
                          .filter((vehicle) => vehicle.transportType === "car")
                          .map((car) => (
                            <option key={car._id} value={car._id}>
                              {car.number} {car.name}
                            </option>
                          ))}
                  </select>
                </div>

                {/* Add other input fields for driver details here */}
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={`grid-name-of-driver-${index}`}>
                    Name Of Driver
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`grid-name-of-driver-${index}`}
                    type="text"
                    name={`bookedTransportId[${index}].nameOfDriver`}
                    value={
                      bookingData.bookedTransportId[index]?.nameOfDriver || ""
                    }
                    onChange={(e) => handleDriverDetails(e, index)}
                    placeholder="Name Of Driver"
                  />
                </div>

                <div className="w-full md:w-1/5 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={`grid-mob-no-of-driver-${index}`}>
                    Mob. No. Of Driver
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`grid-mob-no-of-driver-${index}`}
                    type="number"
                    name={`bookedTransportId[${index}].mobNoOfDriver`}
                    value={
                      bookingData.bookedTransportId[index]?.mobNoOfDriver || ""
                    }
                    onChange={(e) => handleDriverDetails(e, index)}
                    placeholder="Mob. No. Of Driver"
                  />
                </div>

                <div className="w-full md:w-1/5 px-3 items-center justify-center">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                    Remove Vehicle
                  </label>
                <button
                            // onClick={handleRemoveVehicle(bookingData.bookedTransportId[index]._id)}

            onClick={(e) => handleRemoveVehicle( bookingData.bookedTransportId[index]._id)}
            // value={bookingData.noOfVehicle}
            name="noOfVehicle"
            className="flex self-end bg-red-700 my-auto w-full hover:bg-red-500 rounded border border-red-700 text-white  px-4 py-2 ">
             X Remove Vehicle</button>
                  {/* <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`grid-mob-no-of-driver-${index}`}
                    type="number"
                    name={`bookedTransportId[${index}].mobNoOfDriver`}
                    value={
                      bookingData.bookedTransportId[index]?.mobNoOfDriver || ""
                    }
                    onChange={(e) => handleDriverDetails(e, index)}
                    placeholder="Mob. No. Of Driver"
                  /> */}
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeApprovalModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                onClick={() =>
                  updateBooking(bookingData._id, "Approved By Admin")
                }>
                Approve
              </button>
            </div>

            {/* Rest of your code */}
          </div>
        </div>
      )}

      {/* 


      {showApprovalModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Driver Details</h2>


            <div className="mb-6">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-no-of-vehicles">
          Number of Vehicles
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-no-of-vehicles"
          type="number"
          value={bookingData.noOfVehicle}
          name="noOfVehicle"
          onChange={handleDriverDetails}
          placeholder="Number of Vehicles"
          max={1}
        />
      </div>


      {Array.from({ length: Math.max(0, Math.floor(bookingData.noOfVehicle))}).map((_, index) => (
        <>
      <div className="flex flex-wrap -mx-3 mb-6">
          <div key={index} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={`grid-vehicle-type-${index}`}>
            Vehicle Type
          </label>
          <input
            className="appearance-none block w-full capitalize bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={`grid-vehicle-type-${index}`}
            type="text"
            value={bookingData.vehicleType[index] || ""}
            name={`vehicleTypes[${index}]`}
            disabled
          />
          </div>
      
              {bookingData.vehicleType === "bus" ? (
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-mobNoOfDriver">
                    Bus Number
                  </label>

                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-transport-name"
                    name="bookedTransportName"
                    value={bookingData.bookedTransportId._id}
                    // onChange={handleInputs}
                    onChange={(e) => handleVehicleSelect(e)}>
                    <option value="">Select a vehicle</option>
                    

                    {vehicles
                      .filter((vehicle) => vehicle.transportType === "bus")
                      .map((bus) => (
                        <option key={bus._id} value={bus._id}>
                          {bus.number} {bus.name}
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-mobNoOfDriver">
                    Select Vehicle
                  </label>

                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-transport-name"
                    name="bookedTransportName"
                    value={bookingData.bookedTransportId._id}
                    // onChange={handleInputs}
                    onChange={(e) => handleVehicleSelect(e)}>
                    <option value="">Select a vehicle</option>
                   

                    {vehicles
                      .filter((vehicle) => vehicle.transportType === "car")
                      .map((car) => (
                        <option key={car._id} value={car._id}>
                          {car.number} {car.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="grid-name-of-driver">
                  Name Of Driver
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name-of-driver"
                  type="text"
                  value={bookingData.nameOfDriver}
                  name="nameOfDriver"
                  onChange={handleDriverDetails}
                  placeholder="Name Of Driver"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-mobNoOfDriver">
                  Mob. No. Of Driver
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-mob-no-of-driver"
                  type="number"
                  value={bookingData.mobNoOfDriver}
                  name="mobNoOfDriver"
                  onChange={handleDriverDetails}
                  placeholder="Mob. No. Of Driver"
                />
              </div>
            </div>
            </>
             ))}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeApprovalModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                
                onClick={() =>
                  updateBooking(bookingData._id, "Approved By Admin")
                }>
                Approve
              </button>
            </div>
            
          </div>
          
        </div>
        
      )}

             
 */}

      {showRejectionModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Reason for Rejection</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Enter reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}></textarea>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeRejectionModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                // onClick={handleReject}
                onClick={() =>
                  updateBooking(bookingData._id, "Rejected By Admin")
                }>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookingsView;
