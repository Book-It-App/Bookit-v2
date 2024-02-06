import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";
import { format } from "date-fns";
// import BookingForm from "./BookingForm";
// eslint-disable-next-line no-unused-vars
// import { ApprovedByAdmin, ApprovedByHod, RejectedByAdmin } from "../Steps"
// eslint-disable-next-line no-unused-vars
// import Index from "./Table";
const BookingsAdmin = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("Request Sent");
  const [emailVerified, setEmailVerified] = useState(false);
  const [userData, setUserData] = useState({});
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBookingData, setSelectedBookingData] = useState({});
  const [driverDetails, setDriverDetails] = useState({nameOfDriver:"",
  mobNoOfDriver:""});
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const openRejectionModal = (bookingId) => {
    setShowRejectionModal(true);
    setSelectedBookingId(bookingId);
  };

  const [vehicles, setVehicles] = useState([]);

  const openApprovalModal = (bookingId) => {
    // Capture the provided bookingId
    const selectedBookingId = bookingId;
    
    // Log the bookingId for debugging
    console.log(selectedBookingId);
  
    // Set the selectedBookingId state
    // setSelectedBookingId(selectedBookingId);
  
    // Find the booking data for the selected bookingId
    const foundBooking = bookingData.find((booking) => booking._id === selectedBookingId);
  
    // Log the found booking data (Note: This log may not show the updated state immediately due to asynchronous behavior)
    console.log(foundBooking);
    // Set the selectedBookingData state with the found booking data
    setSelectedBookingData(foundBooking);
    // setSelectedBookingData((selectedBookingData) => ({
    //   ...selectedBookingData,
    //   noOfVehicles: 1
    // }));
    console.log(selectedBookingData);
  
    // Log the selectedBookingId (it should be the same as the initially logged bookingId)
    console.log(selectedBookingId);
  
    // Show the approval modal
    setShowApprovalModal(true);
  };
  
  const closeRejectionModal = () => {
    setShowRejectionModal(false);
    setRejectionReason("");
    setSelectedBookingId("");
  };

  const closeApprovalModal = (bookingId) => {
    setShowApprovalModal(false);
    setDriverDetails({});

    setSelectedBookingId("");

    setIsLoading(false)
  };



  const handleNoOfVehicle = (e) => {
    const name = "noOfVehicle";
    // const value = bookingData.bookedTransportId.length;
    // const value = selectedBookingData.noOfVehicle + 1;
  
    let value = selectedBookingData.noOfVehicle || 0; // Initialize with 0 if it's NaN or undefined
  
    // Increment the value by 1
    value += 1;
    setSelectedBookingData({
      ...selectedBookingData,
      [name]: value,
      bookedTransportId: [...selectedBookingData.bookedTransportId, {}],
    });

    console.log(selectedBookingData);
  };
  

  // const handleNoOfVehicle = (e,bookingId) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   console.log(bookingId);


  //    // Map through the array and update the selected booking
  // const updatedBookings = bookingData.map((booking) => {
  //   if (booking._id === bookingId) {
  //     return { ...booking, [name]: value };
  //   }
  //   return booking;
  // });

  // setBookingData(updatedBookings);

  // console.log(bookingData);
  //   // setDriverDetails({ ...driverDetails, [name]: value });
  //   // setBookingData({ ...bookingData, [name]: value });
  // };

  const handleRemoveVehicle = (vehicleId) => {
    const updatedTransportId = selectedBookingData.bookedTransportId.filter(vehicle => vehicle._id !== vehicleId);
  
    setSelectedBookingData({
      ...selectedBookingData,
      bookedTransportId: updatedTransportId,
      noOfVehicle: updatedTransportId.length, // Update the number of vehicles
    });
  };

  // const handleRemoveVehicle = (vehicleId) => {
  //   const updatedTransportId = bookingData.bookedTransportId.filter(vehicle => vehicle._id !== vehicleId);
  
  //   setBookingData({
  //     ...bookingData,
  //     bookedTransportId: updatedTransportId,
  //     noOfVehicle: updatedTransportId.length, // Update the number of vehicles
  //   });
  // };



  const handleDriverDetails = (e, index) => {
    const { name, value } = e.target;

    // Create a copy of the state
    const updatedBookingData = { ...selectedBookingData };

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
   
    setSelectedBookingData(updatedBookingData);
  };


  
  // const handleDriverDetails = (e, index, bookingId) => {
  //   const { name, value } = e.target;
  
  //   // Create a copy of the state
  //   const updatedBookingData = [...bookingData];
  
  //   // Find the booking in the array based on the bookingId
  //   const bookingIndex = updatedBookingData.findIndex((booking) => booking._id === bookingId);
  
  //   // If the booking is found, update its bookedTransportId field
  //   if (bookingIndex !== -1) {
  //     const booking = updatedBookingData[bookingIndex];
  
  //     // Check if bookedTransportId exists, if not, create an empty array
  //     if (!booking.bookedTransportId) {
  //       booking.bookedTransportId = [];
  //     }
  
  //     if (name === `bookedTransportId[${index}].nameOfDriver` || name === `bookedTransportId[${index}].mobNoOfDriver`) {
  //       // Update the specified field in the bookedTransportId array
  //       booking.bookedTransportId[index] = {
  //         ...booking.bookedTransportId[index],
  //         [name.split('.')[1]]: value,
  //       };
  //     }
  
  //     // Find the selected transport (vehicle) based on the ID
  //     const selectedTransport = vehicles.find((vehicle) => vehicle._id === value);
  
  //     // If the selected transport is found, store its information
  //     if (selectedTransport) {
  //       booking.bookedTransportId[index] = selectedTransport;
  //     }
  //   } else {
  //     // If the booking is not found, you may want to create a new booking with the provided details.
  //     // Please adjust this part based on your data structure and requirements.
  //     console.log("Booking not found");
  //   }
  
  //   // Update the state
  //   setBookingData(updatedBookingData);
  // };
  
  // const handleDriverDetails = (e, index,bookingId) => {
  //   const { name, value } = e.target;

  //   // Create a copy of the state
  //   const updatedBookingData = { ...bookingData };

  //   // Check if bookedTransportId[index] exists, if not, create an empty object
  //   if (!updatedBookingData.bookedTransportId[index]) {
  //     updatedBookingData.bookedTransportId[index] = {};
  //   }

  //   if (name === `bookedTransportId[${index}].nameOfDriver` || name === `bookedTransportId[${index}].mobNoOfDriver`) {
  //     updatedBookingData.bookedTransportId[index][name.split('.')[1]] = value;
  //   }
  //   // Find the selected transport (vehicle) based on the ID
  //   const selectedTransport = vehicles.find((vehicle) => vehicle._id === value);

  //   // If the selected transport is found, store its information
  //   if (selectedTransport) {
  //     updatedBookingData.bookedTransportId[index] = selectedTransport;
  //   }

  //   // Update the state
  //   setBookingData(updatedBookingData);
  // };

  const userContact = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getdata`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      //consolelog(data);
      setUserData(data);
      if (data.emailVerified) {
        setEmailVerified(true);
      }

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // //consolelog(error);
    }
  };

  useEffect(() => {
    userContact();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  // const handleDriverDetails = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   // setDriverDetails({ ...driverDetails, [name]: value });
  //   setBookingData({ ...bookingData, [name]: value });
  // };
  




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


  const getBookingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookings`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      // console.log(data);

      const sortedBookingData = data.bookings.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setBookingData(sortedBookingData);

      // setBookingData(data.bookings);
      setIsLoading(false);

      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      //   // throw new Error(response.error);
      // }

      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      // } else

      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {
      //consolelog(error);
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: "Unauthrized",
        });
        navigate("/login");
      }
      // navigate("/login");
    }
  };

  useEffect(() => {
    getBookingData();

    fetchVehicles();

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // navigate(`/transport-booking-system/bookingForm/${transportId}/${transportName}`)

  const updateBooking = async (bookingId, isApproved) => {
    if (isApproved === "Rejected By Admin") {
      if (rejectionReason.trim() === "") {
        toast.error("Please provide a reason for rejection.");
        return;
      } else {
        setRejectionReason(null);
      }
    }
    const { bookedTransportId, 
      noOfVehicle
      // bookedTransportName , nameOfDriver, mobNoOfDriver
     } = selectedBookingData; 
    //  bookingData.find((booking) => booking._id === bookingId);
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
      // else if (mobNoOfDriver.length !== 10) {  
      //   toast.error("Please enter a valid mobile number.");
      //   return;
      // }
    }
    //consolelog(isApproved);
    setIsLoading(true);



    
    //consolelog(isApproved);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/transport-booking-system/bookingsEdit/${bookingId}`,
        {
          bookedTransportId: bookedTransportId.map((transport) => transport._id),
          // bookedTransportName : bookedTransportName,
          noOfVehicle: noOfVehicle,
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
      getBookingData();

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



  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const filteredBookings = Object.values(bookingData).filter((bookingData) => {
    if (filterValue === "Request Sent") {
      return bookingData.isApproved === "Request Sent";
    } else if (filterValue === "Approved By HOD") {
      return bookingData.isApproved === "Approved By HOD";
    } else if (filterValue === "Approved By Admin") {
      return bookingData.isApproved === "Approved By Admin";
    } else if (filterValue === "Rejected By Admin") {
      return bookingData.isApproved === "Rejected By Admin";
    } else if (filterValue === "My Requests") {
      return bookingData.email === userData.email;
    } else {
      return bookingData;
    }
  });




const handleVehicleSelect = (e) => {
  const selectedVehicleId = e.target.value;
  const selectedVehicleObject = vehicles.find(
    (vehicle) => vehicle._id === selectedVehicleId
  );
    console.log(selectedVehicleId);

    setBookingData((bookingData) => {
      const updatedBookingData = {
        ...bookingData,
        bookedTransportId: selectedVehicleObject,
        bookedTransportName: selectedVehicleObject.name,
        nameOfDriver: selectedVehicleObject.nameOfDriver,
        mobNoOfDriver: selectedVehicleObject.mobNoOfDriver,
      };
      console.log(updatedBookingData);
      return updatedBookingData;
    });
  // setBookingData((bookingData) => ({
  //   ...bookingData,
  //   bookedTransportId: selectedVehicleObject,
  //   bookedTransportName: selectedVehicleObject.name,
  //   nameOfDriver: selectedVehicleObject.nameOfDriver,
  //   mobNoOfDriver: selectedVehicleObject.mobNoOfDriver,
  // }
  
  // ));
  console.log(bookingData);
};

  // const transportId =userData.transportId
  // const transportName = userData.transportName

  // const handleBookingClick = (transportId,transportName) => {
  //   navigate('/bookingForm', { state: { transportId, transportName } });

  // };

  // const handleBookingClick = () => {
  //   sendData(data);
  // };
  const handleEditClick = (bookingId) => {
    navigate(`/transport-booking-system/bookingsEdit/${bookingId}`);
  };

  const handleViewClick = (bookingId) => {
    navigate(`/transport-booking-system/bookingsView/${bookingId}`);
  };
  return (
    <>
      {/* <Index /> */}

      <div className="mt-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Booking<span className="text-indigo-700"> Requests</span>

          <Link to="/transport-booking-system/bookingForm">
            <button className="flex self-end bg-indigo-700 lg:text-lg lg:font-bold absolute right-6 top-32  md:block  hover:bg-indigo-500 rounded border border-indigo-700 text-white  sm:px-8 py-1 sm:py-3 text-sm">
              Book Now</button>
          </Link>
        </h1>

        <div className="flex flex-wrap my-8 justify-center">
          <button
            className={`rounded-full px-4 py-2 mx-4  focus:outline-none ${
              filterValue === "all"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => handleFilter("all")}>
            All
          </button>

          {process.env.REACT_APP_HOD_FEATURE === "true" ? (
            <button
              className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
                filterValue === "Approved By HOD"
                  ? "bg-indigo-100 text-indigo-800 "
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => handleFilter("Approved By HOD")}>
              Pending
            </button>
          ) : (
            <button
              className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
                filterValue === "Request Sent"
                  ? "bg-indigo-100 text-indigo-800 "
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => handleFilter("Request Sent")}>
              Pending
            </button>
          )}
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
              filterValue === "Approved By Admin"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => handleFilter("Approved By Admin")}>
            Approved
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
              filterValue === "Rejected By Admin"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-white text-gray-800   hover:bg-gray-100"
            }`}
            onClick={() => handleFilter("Rejected By Admin")}>
            Rejected
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
              filterValue === "My Requests"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-white text-gray-800   hover:bg-gray-100"
            }`}
            onClick={() => handleFilter("My Requests")}>
            My Requests
          </button>
        </div>






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
                value={selectedBookingData.noOfVehicle}
                // name="noOfVehicle"
                // onChange={handleNoOfVehicle}
                placeholder="Number of Vehicles"
                // min="1"  
                disabled 
                
              />
            </div> 
    
            {Array.from({ length: Math.max(0, Math.floor(selectedBookingData.noOfVehicle))}).map((_, index) => (

                
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
                    value={selectedBookingData.vehicleType || ""}
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
                    value={selectedBookingData.bookedTransportId[index]?._id || ""}
                    onChange={(e) => handleDriverDetails(e, index)}>
                    <option value="">Select a vehicle</option>
                    {selectedBookingData.vehicleType === "bus"
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
                      selectedBookingData.bookedTransportId[index]?.nameOfDriver || ""
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
                      selectedBookingData.bookedTransportId[index]?.mobNoOfDriver || ""
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

            onClick={(e) => handleRemoveVehicle( selectedBookingData.bookedTransportId[index]._id)}
            // value={bookingData.noOfVehicle}
            name="noOfVehicle"
            className="flex self-end bg-red-700 my-auto w-full hover:bg-red-500 rounded border border-red-700 text-white  px-4 py-2 ">
             X Remove Vehicle</button>
                  
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
                  updateBooking(selectedBookingData._id, "Approved By Admin")
                }>
                Approve
              </button>
            </div>

            {/* Rest of your code */}
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
                    updateBooking(selectedBookingId, "Rejected By Admin")
                  }>
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : !emailVerified ? (
          <div className="flex items-center flex-col my-12 justify-center  ">
            {/* <div className="w-full lg:w-1/2"> */}
            <h1 className=" text-2xl  lg:text-4xl font-extrabold text-gray-800 my-3">
              Looks Like Yout Have Not Verified Your Email!
            </h1>
            <p className=" text-xl text-gray-800 my-5">
              Please click on the below button and verify email before booking.
            </p>
            {/* <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
            <div>
              <Link to="/profile">
                <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Verify Email
                </button>
              </Link>
            </div>
            {/* </div> */}
          </div>
        ) : (
          <div className="container w-full px-4 mx-auto sm:px-8 ">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 ">
              <div className="inline-block min-w-full border overflow-hidden rounded-lg  shadow-xl shadow-blue-100 ">
                <table className="min-w-full leading-normal    ">
                  <thead>
                    <tr className="bg-gray-200 border-gray-500  leading-normal  text-center">
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                        Vehicle Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase  border-gray-200">
                        Vehicle Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                        Outstation/Local
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                        Department
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                        Booking Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(filteredBookings) &&
                    filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        // <div key={booking._id} className="my-2 ">

                        <>





{/* 
{showApprovalModal && (
        <div className="fixed top-0 left-0  flex items-center justify-center w-full h-full z-20 bg-black bg-opacity-25 overflow-auto">
          <div className="bg-white p-4 rounded-md shadow-md w-4/5 max-h-full overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Vehicle and Driver Details</h2>

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
                value={booking.noOfVehicle}
                name="noOfVehicle"
                onChange={(e) => handleNoOfVehicle(e, booking._id)}
                // onChange={handleNoOfVehicle(booking._id)}
                placeholder="Number of Vehicles"
                min="1"
                
                
              />
            </div>

            {Array.from({ length: Math.max(0, Math.floor(booking.noOfVehicle))}).map((_, index) => (

              <div key={index} className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                    value={booking.vehicleType || ""}
                    disabled
                  />
                </div>

                <div className="w-full md:w-1/4 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={`grid-transport-name-${index}`}>
                    Select Vehicle
                  </label>

                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`grid-transport-name-${index}`}
                    name={`bookedTransportId[${index}]`}
                    value={booking.bookedTransportId[index]?._id || ""}
                    onChange={(e) => handleDriverDetails(e, index,booking._id)}>
                    <option value="">Select a vehicle</option>
                    {booking.vehicleType === "bus"
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

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                      booking.bookedTransportId[index]?.nameOfDriver || ""
                    }
                    onChange={(e) => handleDriverDetails(e, index)}
                    placeholder="Name Of Driver"
                  />
                </div>

                <div className="w-full md:w-1/4 px-3">
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
                      booking.bookedTransportId[index]?.mobNoOfDriver || ""
                    }
                    onChange={(e) => handleDriverDetails(e, index)}
                    placeholder="Mob. No. Of Driver"
                  />
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
                  updateBooking(booking._id, "Approved By Admin")
                }>
                Approve
              </button>
            </div>

          </div>
        </div>
      )}
 */}


























































{/* 


                        {showApprovalModal && (
                          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-md shadow-md w-1/3">
                              <h2 className="text-lg font-bold mb-4">Driver Details</h2>
                  
                              <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                                    htmlFor="grid-vehicle-type">
                                    Vehicle Type
                                  </label>
                                  <input
                                    className="appearance-none block w-full capitalize bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-vehicle-type"
                                    type="text"
                                    value={booking.vehicleType}
                                    name="vehicleType"
                                    // onChange={handleDriverDetails}
                                    placeholder=" Vehicle Type"
                                    disabled
                                  />
                                </div>
                  
                                {booking.vehicleType === "bus" ? (
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
                                      value={booking.bookedTransportId._id}
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
                                      value={booking.bookedTransportId._id}
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
                                    updateBooking(booking._id, "Approved By Admin")
                                  }>
                                  Approve
                                </button>
                              </div>
                            </div>
                          </div>
                        )} */}




                        <tr
                          key={booking._id}
                          className="border-gray-200 text-center border-b-2  ">
                          <td className="px-5 py-5 text-m  bg-white  border-gray-200">
                          {booking.bookedTransportId.map((transport, index) => (
    <p key={index} className="text-gray-900 whitespace-no-wrap">
      {transport.number ? transport.number : "Not Alloted"}
    </p>
  ))}
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                          {booking.bookedTransportId.map((transport, index) => (
    <p key={index} className="text-gray-900 whitespace-no-wrap">
      {transport.name ? transport.name : "Not Alloted"}
    </p>
  ))}
        
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {booking.outstationOrLocal}
                            
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.department}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            {booking.eventDateType === "multiple" ? (
                              <p className="text-gray-900 whitespace-no-wrap ">
                                {format(
                                  new Date(booking.eventStartDate),
                                  "EEEE dd-MM-yyyy"
                                )}
                                <br />
                                To
                                <br />
                                {format(
                                  new Date(booking.eventEndDate),
                                  "EEEE dd-MM-yyyy"
                                )}
                              </p>
                            ) : (
                              <p className="text-gray-900 whitespace-no-wrap">
                                {format(
                                  new Date(booking.eventDate),
                                  "EEEE dd-MM-yyyy"
                                )}
                              </p>
                            )}
                          </td>

                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            {booking.isApproved === "Approved By Admin" && (
                              // <ApprovedByAdmin />
                              <p className="text-green-600 font-bold whitespace-no-wrap">
                                {/* {booking.isApproved} */}
                                Approved
                              </p>
                              // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-green-500 font-black">
                              // </p>
                            )}
                            {booking.isApproved === "Approved By HOD" && (
                              // <ApprovedByHod />
                              <p className="text-blue-600 font-bold  whitespace-no-wrap">
                                {booking.isApproved}
                              </p>
                            )}

                            {booking.isApproved === "Request Sent" && (
                              // <ApprovedByHod />
                              <p className="text-blue-600 font-bold  whitespace-no-wrap">
                                Pending
                              </p>
                            )}

                            {booking.isApproved === "Rejected By Admin" && (
                              <p className="text-red-900 font-bold  whitespace-no-wrap">
                                {/* {booking.isApproved} */}
                                Rejected
                              </p>
                            )}
                          </td>

                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <button
                              onClick={() => handleViewClick(booking._id)}
                              className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">
                              View
                            </button>
                            <button
                              onClick={() => handleEditClick(booking._id)}
                              className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300  focus:outline-none">
                              Edit
                            </button>
                            <button
                              // onClick={() =>
                              //   updateBooking(booking._id, "Approved By Admin")
                              // }
                              onClick={() => openApprovalModal(booking._id)}
                              className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                              Approve
                            </button>
                            <button
                              onClick={() => openRejectionModal(booking._id)}
                              className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                              Reject
                            </button>
                          </td>
                        </tr>
                        </>
                        // </div>
                      ))
                    ) : (
                      <tr className="border-gray-200 border-b justify-center">
                        <td
                          className="px-5 py-5 font-bold text-m bg-white border-gray-200 text-center"
                          colSpan="7">
                          <p className="text-gray-900 whitespace-no-wrap">
                            No Bookings Requests found.
                          </p>
                        </td>
                      </tr>

                      // <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No Bookings Requests found.</h2>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingsAdmin;
