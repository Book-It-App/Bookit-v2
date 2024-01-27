import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";
import { parseISO } from 'date-fns';

const BookingForm = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const { bookingId } = useParams();
  //consolelog(bookingId);
  const [isLoading, setIsLoading] = useState(true);
  // const { transportId, transportName } = props.location.state;
 
  const [vehicles, setVehicles] = useState([]);

  const [bookingData, setBookingData] = useState(
    { userId:"",
      eventManager: "",
      // department:"",
      eventDateType:"",
      eventStartDate:"",
      eventEndDate:"",
      // eventName: "",
      eventDate: "",  
      startTime: "",
      endTime: "",
      email: "",
      userType:"",
      bookedTransportId: "",
      bookedTransportName: "",
      selfOrGuest:"",
      noOfPerson:"",
      roundOrOneway:"",
      outstationOrLocal:"",
      naneOfGuest:"",
      mobNoOfGuest:"",
      nameOfDriver:"",
      mobNoOfDriver:"",
      pickupLocation:"",
      dropLocation:"",
      // organizingClub: "",
      phoneNumber: "",
      altNumber: "",  
      isApproved:""


    });

    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/transports`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        const vehicleList = response.data.transports; // Modify this based on your API response structure
    
        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    

  const getbookingById = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsView/${bookingId}`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
      });

      const data = response.data.booking;
      //consolelog(data);

      // setBookingData(data)
      setIsLoading(false);
      setBookingData({
        ...bookingData,
        userId:data.userId,
        eventManager: data.eventManager,
        // department:data.department,
        // eventName: data.eventName,
        eventDateType:data.eventDateType,
        eventStartDate: data.eventStartDate ? data.eventStartDate.split("T")[0] : null,
        eventEndDate: data.eventEndDate ? data.eventEndDate.split("T")[0] : null,
        eventDate: data.eventDate ? data.eventDate.split("T")[0] : null,
        startTime: data.startTime ? data.startTime.split("T")[1].slice(0, 5) : null,
        endTime: data.endTime ? data.endTime.split("T")[1].slice(0, 5) : null,
        email: data.userId.email,
        userType:data.userId.userType,
        bookedTransportId: data.bookedTransportId._id,
        bookedTransportName: data.bookedTransportName,


        selfOrGuest:data.selfOrGuest,
        noOfPerson:data.noOfPerson,
        roundOrOneway:data.roundOrOneway,
      outstationOrLocal:data.outstationOrLocal,
    naneOfGuest:data.naneOfGuest,
    mobNoOfGuest:data.mobNoOfGuest,
    pickupLocation:data.pickupLocation,
    dropLocation:data.dropLocation,
    nameOfDriver:data.nameOfDriver,
    mobNoOfDriver:data.mobNoOfDriver,

        // organizingClub: data.organizingClub,
        phoneNumber: data.phoneNumber,
        altNumber: data.altNumber,  
        isApproved:data.isApproved
      });

      setIsLoading(false);
      console.log(bookingData)
      // if (response.status !== 200) {
      //   throw new Error(response.error);
      // }
      
    } catch (error) {
     
      //consolelog(error);      
      // navigate("/login");
    }
  };

  useEffect(() => {
    
    getbookingById();
    fetchVehicles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle change here

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookingData({ ...bookingData, [name]: value });
  };

  //consolelog(bookingData);

  // send to backend

  const bookingForm = async (e) => {
    e.preventDefault();
    const { eventManager,
      userId,
      // department,
      // eventName,
      eventDateType,
      eventStartDate,
      eventEndDate,
      eventDate,
      startTime,
      endTime,
      email,
      userType,
      bookedTransportId,
      bookedTransportName,
            selfOrGuest,
      noOfPerson,
      roundOrOneway,
      outstationOrLocal,
  naneOfGuest,
  mobNoOfGuest,
  pickupLocation,
  dropLocation,
  nameOfDriver,
  mobNoOfDriver,
      // organizingClub,
      phoneNumber,
      altNumber,
      isApproved } = bookingData;

      console.log(bookingData)
      


      if (isApproved === "Approved By Admin") {
        if (!nameOfDriver || !mobNoOfDriver) {
          toast.error("Please fill in all details.");
          return;
        } else if (mobNoOfDriver.toString().length !== 10) {  
          toast.error("Please enter a valid mobile number.");
          return;
        }
      }
     
    //consolelog(isApproved);
    
    try {
      console.log(bookingData);
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsEdit/${bookingId}`,
        {
          userId,
          // department,
          eventManager,
          // eventName,
          eventDateType,
          eventStartDate,
          eventEndDate,
          eventDate,
          startTime:parseISO(`2000-01-01T${startTime}:00.000Z`),
          endTime:parseISO(`2000-01-01T${endTime}:00.000Z`),
          email,
          userType,
          selfOrGuest,
          noOfPerson,
          roundOrOneway,
      outstationOrLocal,
      naneOfGuest,
      mobNoOfGuest,
      pickupLocation,
      dropLocation,
      nameOfDriver,
  mobNoOfDriver,
          bookedTransportId,
          bookedTransportName,
          // organizingClub,
          phoneNumber,
          altNumber,
          isApproved
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data) {
        toast.error("Request not send!")
        // //consolelog("Message not send");
      } else {
        toast.success("Request send Successfull!")
        // alert("Message send");
        navigate("/transport-booking-system/bookings")
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error);
        //consolelog(data.error);
        // window.alert(data.error);
      } else {
        //consoleerror(error);
      }
      // //consolelog(error);
    }
  };


  const handleVehicleSelect = (e) => {
    const selectedVehicleId = e.target.value;
    const selectedVehicleObject = vehicles.find((vehicle) => vehicle._id === selectedVehicleId);
  
    setBookingData((bookingData) => ({
      ...bookingData,
      bookedTransportId: selectedVehicleObject._id,
      bookedTransportName: selectedVehicleObject.name ,


    }));
    console.log(bookingData)
  };
  

  return (
    <>
    {isLoading ? (
      <LoadingSpinner />
    )    : (
    <div>
      <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
        <div className="text-center mb-16">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
            Update Booking
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Update <span className="text-indigo-600">Booking </span>
          </h3>
        </div>

        <form method="POST" className="w-full">


          <div className="flex flex-wrap -mx-3 mb-6">


            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                htmlFor="grid-event-manager"
              >
                Booking Faculty/Staff
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-manager"
                type="text"
                value={bookingData.eventManager}
                name="eventManager"
                onChange={handleInputs}
                placeholder="Booking Faculty/Staff"
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>


            {/* <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-event-name"
              >
                Event Name
              </label>
              <input
                value={bookingData.eventName}
                name="eventName"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-name"
                type="text"
                placeholder="Event Name"
              />
            </div>
          </div>




          <div className="flex flex-wrap -mx-3 mb-6">


                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-organizing-club"
                      >
                        Organizing Club
                      </label>
                      <input
                        value={bookingData.organizingClub}
                        name="organizingClub"
                        onChange={handleInputs}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-organizing-club"
                        type="text"
                        placeholder="Organizing Club"
                      />
                    </div> */}



         

                <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-event-date-type"
                    >
                      Booking  Type
                    </label>
                    

                    <select
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="eventDateType"
                            name="eventDateType"
                            value={bookingData.eventDateType}
                            onChange={handleInputs}>
                            <option value="">Select</option>
                            {/* <option value="half">Half Day</option> */}
                            <option value="full">Single Day</option>
                            <option value="multiple">Miltiple Days</option>
                          </select>

                     </div>


          </div>






          {bookingData.eventDateType === "multiple" && (



<div className="flex flex-wrap -mx-3 mb-6">

<div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-event-date"
              >
                Event Start Date
              </label>
              <input
                value={bookingData.eventStartDate}
                name="eventStartDate"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-date"
                type="date"
                placeholder="Booking date"
                min={new Date().toISOString().split("T")[0]}

              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-event-start-date"
              >
                Event End Date
              </label>
              <input
                value={bookingData.eventEndDate}
                name="eventEndDate"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-end-date"
                type="date"
                placeholder="Booking date"
                min={new Date().toISOString().split("T")[0]}

              />
            </div>
</div>



      )
      }









            <div className="flex flex-wrap -mx-3 mb-6">

            {(bookingData.eventDateType === "full" || bookingData.eventDateType === "half") &&(
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-event-date"
                  >
                    Booking date
                  </label>
                  <input
                    value={bookingData.eventDate}
                    name="eventDate"
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date"
                    type="date"
                    placeholder="Booking date"
                    min={new Date().toISOString().split("T")[0]}

                  />
                </div>

            )}
            
   
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                htmlFor="grid-transport-name"
              >
                Transport Name
              </label>

              <select
    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    id="grid-transport-name"
    name="bookedTransportName"
    value={bookingData.bookedTransportId}
    // onChange={handleInputs}
    onChange={(e) => handleVehicleSelect(e)}
  >
    {/* <option value="">Select a vehicle</option> */}
    {/* <option value={bookingData.bookedTransportName}>{bookingData.bookedTransportName}</option> */}
    
    {vehicles.map((vehicle) => (
      <option key={vehicle._id} value={vehicle._id}>
        {vehicle.number} {vehicle.name} 
      </option>
    ))}
  </select>

              {/* <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-transport-name"
                type="text"
                value={bookingData.bookedTransportName}
                name="bookedTransportName"
                onChange={handleInputs}
                placeholder="Transport Name"
              /> */}
            </div>






          </div>

            



          {/* {bookingData.eventDateType === "half" && ( */}

          <div className="flex flex-wrap -mx-3 mb-6">


            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                htmlFor="grid-start-time"
              >
                Start Time
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-start-time"
                type="time"
                value={bookingData.startTime}
                name="startTime"
                onChange={handleInputs}
                placeholder="Start Time"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-end-time"
              >
                End Time
              </label>
              <input
                value={bookingData.endTime}
                name="endTime"
                onChange={handleInputs}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-end-time"
                type="time"
                placeholder="End Time"
              />
            </div>
          </div>


          {/* )} */}
        
          <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-no-of-person">
                      No. Of Person Traveling
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-no-of-person"
                      type="number"
                      value={bookingData.noOfPerson}
                      name="noOfPerson"
                      onChange={handleInputs}
                      placeholder="No. Of Person"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-selfOrGuest">
                      Self Or Guest
                    </label>
                    <select
                      className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-self-or-guest"
                      name="selfOrGuest"
                      value={bookingData.selfOrGuest}
                      onChange={handleInputs}>
                      <option value="">Select</option>
                      <option value="self">Self</option>
                      <option value="guest">Guest</option>
                     
                    </select>
                    
                  </div>
                </div>










 {bookingData.selfOrGuest === "guest" && (
 <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-name-of-guest">
                      Name Of Guest
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-name-of-guest"
                      type="text"
                      value={bookingData.naneOfGuest}
                      name="naneOfGuest"
                      onChange={handleInputs}
                      placeholder="Name Of Guest"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-mobNoOfGuest">
                      Mob. No. Of Guest
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-mob-no-of-guest"
                      type="number"
                      value={bookingData.mobNoOfGuest}
                      name="mobNoOfGuest"
                      onChange={handleInputs}
                      placeholder="Mob. No. Of Guest"

                    />
                    
                  </div>
                </div>


 )}


<div className="flex flex-wrap -mx-3 mb-6">
{bookingData.selfOrGuest === "guest" && (
<div className="w-full md:w-1/2 px-3">
  <label
    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    htmlFor="grid-round-or-oneway">
    Round Or One-Way Trip
  </label>
  <select
    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    id="grid-round-or-oneway"
    name="roundOrOneway"
    value={bookingData.roundOrOneway}
    onChange={handleInputs}>
    <option value="">Select</option>
    <option value="round">Round</option>
    <option value="oneway">One-Way</option>
   
  </select>
  
</div>

)}
<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  <label
    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
    htmlFor="grid-outstaion-or-local">
    Outstaion or Local
  </label>
  <select
    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    id="grid-outstaion-or-local"
    name="outstationOrLocal"
    value={bookingData.outstationOrLocal}
    onChange={handleInputs}>
    <option value="">Select</option>
    <option value="outstaion">Outstaion</option>
    <option value="oneway">Local</option>
   
  </select>
</div>
</div>


<div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      htmlFor="grid-pickup-location">
                      Pickup Location
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-pickup-location"
                      type="text"
                      value={bookingData.pickupLocation}
                      name="pickupLocation"
                      onChange={handleInputs}
                      placeholder="Pickup Location"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-drop-location">
                       Drop Location
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-drop-location"
                      type="text"
                      value={bookingData.dropLocation}
                      name="dropLocation"
                      onChange={handleInputs}
                      placeholder="Drop Location"
                     
                    />
                    
                  </div>
                </div>

          <div className="flex flex-wrap -mx-3 mb-6">


            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                htmlFor="grid-phone-number"
              >
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-phone-number"
                type="number"
                value={bookingData.phoneNumber}
                name="phoneNumber"
                onChange={handleInputs}
                placeholder="Phone Number"

              />
            </div>


            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                htmlFor="grid-alt-number"
              >
                Alternate Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-alt-number"
                type="number"
                value={bookingData.altNumber}
                name="altNumber"
                onChange={handleInputs}
                placeholder="Alternate Number"

              />
            </div>
          </div>



  {bookingData.isApproved === "Approved By Admin" && 
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
                  onChange={handleInputs}
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
                  id="grid-mobNoOfDriver"
                  type="number"
                  value={bookingData.mobNoOfDriver}
                  name="mobNoOfDriver"
                  onChange={handleInputs}
                  placeholder="Mob. No. Of Driver"
                  />
              </div>
            </div>

                }








          <div className="my-4">
              <p className="text-s text-red-600	 font-bold">{authStatus}</p>
            </div>








          <div className="flex flex-wrap -mx-3 mb-6">

            <div className="flex justify-between w-full px-3">
              <button
                onClick={bookingForm}
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
          )}
          </>
  );
};

export default BookingForm;
