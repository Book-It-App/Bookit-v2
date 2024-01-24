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
  const [bookingData, setBookingData] = useState({});
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [driverDetails, setDriverDetails] = useState({  nameOfDriver:"",
  mobNoOfDriver:""});
  const { state } = useContext(UserContext);

  //consolelog(state.userType);

  const openRejectionModal = (bookingId) => {

    setShowRejectionModal(true);

  };

  const openApprovalModal = (bookingId) => {

    setShowApprovalModal(true);

  };
  
  const closeRejectionModal = () => {
    setShowRejectionModal(false);
    setRejectionReason("");
  };

  const closeApprovalModal = () => {
    setShowApprovalModal(false);
    setDriverDetails({});
  };

  // const handleReject = async () => {

  //   if (rejectionReason.trim() === '') {
  //     toast.error('Please provide a reason for rejection.');
  //     return;
  //   }

  //   try {
  //     await axios.put(`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsEdit/${selectedBookingId}`,
  //       {
  //         isApproved: 'Rejected By Admin',
  //         rejectionReason: rejectionReason.trim(), // Send rejection reason in the request
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     closeRejectionModal();
  //     toast.success('Booking request rejected successfully!');
  //     getbookingById(); // Refresh booking data
  //   } catch (error) {
  //     // Handle error
  //     if (error.response && error.response.status === 401) {
  //       toast.error('Unauthorized access. Please check your permissions.');
  //     } else {
  //       toast.error('Failed to reject the booking request.');
  //     }
  //   }
  // };

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
      //consolelog(data);
      setBookingData(data);
      setIsLoading(false);
      //consolelog("booking wveie ")
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
    const { nameOfDriver, mobNoOfDriver } = driverDetails;

    if (isApproved === "Approved By Admin") {
      if ((nameOfDriver.trim() === "") && (mobNoOfDriver.trim() === "")) {
        toast.error("Please fill all details.");
        return;
      } else if (mobNoOfDriver.length !== 10) {  
        toast.error("Please enter a valid mobile number.");
        return;
      }
    }
    //consolelog(isApproved);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsEdit/${bookingId}`,
        {
          isApproved: isApproved,
          nameOfDriver:isApproved === "Rejected By Admin" ? null : nameOfDriver,
          mobNoOfDriver: isApproved === "Rejected By Admin" ? null : mobNoOfDriver,
          rejectionReason: isApproved === "Approved By Admin" ? null : rejectionReason,
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
      if(error.response.status === 422){
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

  // const deleteBooking = async (bookingId) => {
  //   try {
  //     const response = await axios.delete (`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookings/${bookingId}`,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           // Accept: "application/json",
  //           "Content-Type": "application/json"
  //         },
  //       }
  //     );
  //     const data = response.data;
  //     if (data) {
  //       navigate("/")
  //       toast.success("Booking Deleted Successfull!")
  //     } else {
  //       toast.error("Request not send!")
  //       // setShowRejectionModal(false);
  //       // setSelectedBookingId("");
  //     }
  //   } catch (error) {
  //     if (error.response.status === 404 && error.response) {
  //       const data = error.response.data;
  //       //consolelog(data.error);
  //     } else {
  //       navigate("/")
  //       //consoleerror(error);
  //     }
  //   }
  // };

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
  const handleDriverDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDriverDetails({ ...driverDetails, [name]: value });
  };


  useEffect(() => {
    getbookingById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                {/* <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-event-name">
                    Event Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name">
                    {bookingData.eventName}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-organizing-club">
                    Organizing Club
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-organizing-club">
                    {bookingData.organizingClub}
                  </p>
                </div> */}

                {/* <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-event-date"
                  >
                    Booking date
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date"
                  >{format(new Date(bookingData.eventDate), "EEEE dd-MM-yyyy")}</p>
                </div> */}

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-event-date">
                    Booking date Type
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date">
                    {bookingData.eventDateType === "multiple"
                      ? "Multiple Days"
                      : bookingData.eventDateType === "half"
                      ? "Half Day"
                      : "Full Day"}
                  </p>
                </div>
              </div>

              {bookingData.eventDateType === "multiple" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-start-time">
                      Event Start Date
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
                      Event End Date
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
                    Vehicle Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-transport-name">
                    {bookingData.bookedTransportName}
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
                    Self or Guest
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
                      {bookingData.naneOfGuest}
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
                      {bookingData.mobNoOfGuest}
                    </p>
                  </div>
                </div>
              )}




<div className="flex flex-wrap -mx-3 mb-6">

{bookingData.selfOrGuest === "guest" && (
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
)}

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
                    Alternate Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number">
                    {bookingData.altNumber ? bookingData.altNumber : "Not Provided"}
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
              {bookingData.isApproved === "Approved By Admin" && (
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
                      {bookingData.nameOfDriver}
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
                      {bookingData.mobNoOfDriver}
                    </p>
                  </div>
                </div>
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
                {/* <button onClick={() => handleViewClick(bookingData._id)} className="text-m font-semibold ml-5 leading-none text-gray-600 py-3 px-5 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">View</button> */}
                {/* <button onClick={() => handleEditClick(bookingData._id)}
                  className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">Edit</button>
               */}

                {state.userType === "admin" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">
                      Edit
                    </button>

                    <button
                      // onClick={() =>
                      //   updateBooking(bookingData._id, "Approved By Admin")
                      // }
                      onClick={() => openApprovalModal(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectionModal(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                      Reject
                    </button>

                    {/* <button
                  onClick={() => deleteBooking(bookingData._id)} 
                  // onClick={() => handleDeleteModal(bookingData._id)}
                  className="   leading-none text-gray-600 py-3 px-5 bg-red-400 rounded hover:bg-red-500 focus:outline-none">Delete</button>
            */}
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

                    {/* <button
                  onClick={() => deleteBooking(bookingData._id)}
                  // onClick={() => handleDeleteModal(bookingData._id)}
                   className="   leading-none text-gray-600 py-3 px-5 bg-red-400 rounded hover:bg-red-500 focus:outline-none">Delete</button>
            */}
                  </>
                )}

                {/* 
                <button
               onClick={() => updateBooking(bookingData._id, `Approved By ${state.userType}`)} className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">Approve</button>
               <button
               onClick={() => updateBooking(bookingData._id, `Rejected By ${state.userType}`)} className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">Reject</button>
              */}

                {/* 
                <button
                  onClick={() => deleteBooking(bookingData._id)} className="   leading-none text-gray-600 py-3 px-5 bg-red-400 rounded hover:bg-red-500 focus:outline-none">Delete</button> */}
              </div>
            </form>
          </div>
        </div>
      )}

      {showApprovalModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Driver Details</h2>
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
                  
                  value={driverDetails.nameOfDriver}
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
                  
                  value={driverDetails.mobNoOfDriver}
                  name="mobNoOfDriver"
                  onChange={handleDriverDetails}
                  placeholder="Mob. No. Of Driver"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeApprovalModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                // onClick={handleReject}
                onClick={() =>
                  updateBooking(bookingData._id, "Approved By Admin")
                }>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

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
      {/* {showRejectionModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete ?
            </h2>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none"
                onClick={() =>
                  deleteBooking(selectedBookingId)
                }
                // onClick={handleDeleteBooking}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg focus:outline-none"
                onClick={() => setShowRejectionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};
export default BookingsView;
