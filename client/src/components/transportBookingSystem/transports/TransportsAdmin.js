import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";
// import BookingForm from "./BookingForm";

const TransportsAdmin = () => {
  const navigate = useNavigate();
  const [transportData, setTransportData] = useState({});
    const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("all");
  // const [authStatus, setAuthStatus] = useState("");
  const [showModal,setShowModal]=useState(false);
  const [selectedTransportId, setSelectedTransportId] = useState("");
  const [selectedTransportName, setSelectedTransportName] = useState("");

  const callAboutPage = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/about`, {
        withCredentials: true, 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      //consolelog(data);
      setUserData(data);
      console.log(data);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: 'Unauthrized'
      })
        navigate("/login");
      }
    }
  };
  // useEffect(() => {
  //   callAboutPage()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  const getTransportsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/transports`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      // console.log(data);
      setTransportData(data.transports);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      // navigate("/login");
    }
  };



  useEffect(() => {
  callAboutPage()
    getTransportsData();

  }, [])


  
  const handleDeleteClick = async (transportId) => {
    // e.preventDefault();


    try {
      const response = await axios.delete (`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/transports/${transportId}`,

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
        // console.log("Message not send");
      } else {
        getTransportsData();
        toast.success("Vehicle Deleted Successfull!")
        // alert("Message send");
        setShowModal(false);
        setSelectedTransportId("");
        setSelectedTransportName("");
        navigate("/transport-booking-system/transports")
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        // setAuthStatus(data.error);
        // console.log(data.error);
        // window.alert(data.error);
      } else {
        console.error(error);
      }
      // console.log(error);
    }
  };




  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const filteredTransports = Object.values(transportData).filter((transportData) => {
    if (filterValue === "bus") {
      return transportData.transportType === "bus";
    } else if (filterValue === "car") {
      return transportData.transportType === "car";
    } else {
      return transportData;
    }
  });

  // const handleBookingClick = (transportId, transportName) => {
  //   navigate(`/transport-booking-system/bookingForm/${transportId}/${transportName}`)
  // };

  const handleEditClick = (transportId, transportName) => {
    navigate(`/transport-booking-system/transports/${transportId}/${transportName}`)
  };


  // const transportId =transportData.transportId
  // const transportName = transportData.transportName

  // const handleBookingClick = (transportId,transportName) => {
  //   navigate('/bookingForm', { state: { transportId, transportName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };
  const handleDeleteModal = (transportId, transportName) => {
    setSelectedTransportId(transportId);
    setSelectedTransportName(transportName);
    setShowModal(true);
  };

  return (


    <>
    {/* <Index /> */}

    <div className="mt-6">

    <div className="py-5 md:py-0 flex container mx-auto px-6 justify-between  items-center">
   <div className="mx-auto ">
    <h1 className="text-xl  sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
   Available <span className="text-indigo-700"> Vehicles</span>  </h1>

   </div>
   <Link to="/transport-booking-system/transportForm">
            <button className="flex self-end bg-indigo-700 lg:text-lg lg:font-bold absolute right-6 top-32  md:block  hover:bg-indigo-500 rounded border border-indigo-700 text-white  sm:px-8 py-1 sm:py-3 text-sm">
              Add Vehicle</button>
          </Link>
   </div>
      

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

        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "car"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("car")}>
          Car
        </button>
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "bus"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800   hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("bus")}>
          Bus
        </button>
       
      </div>
 
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete {selectedTransportName}?
            </h2>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none"
                onClick={() =>
                  handleDeleteClick(selectedTransportId)
                }
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
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
                      Vehicle Type
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                      Driver Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                      Driver Mob. No.
                    </th>
                    
                    <th
                      scope="col"
                      className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredTransports) &&
                  filteredTransports.length > 0 ? (
                    filteredTransports.map((transport) => (
                      // <div key={transport._id} className="my-2 ">

                      <tr
                        key={transport._id}
                        className="border-gray-200 text-center border-b-2  ">
                        <td className="px-5 py-5 text-m  bg-white  border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {transport.number}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-m bg-white  border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {transport.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-m bg-white  border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                          {transport.transportType}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-m bg-white  border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {transport.nameOfDriver}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-m bg-white  border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {transport.mobNoOfDriver}
                          </p>
                        </td>

                      

                        

                        <td className="px-5 py-5 text-m bg-white  border-gray-200">
                        {/* <button
                          
                            onClick={() => handleBookingClick(transport._id, transport.name)}
                            className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                            Book Now
                          </button> */}
                          <button
                            onClick={() => handleEditClick(transport._id, transport.name)}
                            className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300  focus:outline-none">
                            Edit
                          </button>
                          
                          <button
                            onClick={() => handleDeleteModal(transport._id, transport.name)}
                            className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                            Delete
                          </button>
                        </td>
                      </tr>
                      // </div>
                    ))
                  ) : (
                    <tr className="border-gray-200 border-b justify-center">
                      <td
                        className="px-5 py-5 font-bold text-m bg-white border-gray-200 text-center"
                        colSpan="7">
                        <p className="text-gray-900 whitespace-no-wrap">
                          No Transports Requests found.
                        </p>
                      </td>
                    </tr>

                    // <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No Transports Requests found.</h2>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  {/* </> */}





















































































































{/* <> */}
{/* {isLoading ? (
          <LoadingSpinner />
        ) : 
    <div className="mt-6 min-h-screen"> 
    
   <div className="py-5 md:py-0 flex container mx-auto px-6 justify-between  items-center">
   <div className="mx-auto ">
    <h1 className="text-xl  sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
   Available <span className="text-indigo-700"> Vehicles</span>  </h1>

   </div>
   <Link to="/transport-booking-system/transportForm">
            <button className="flex self-end bg-indigo-700 lg:text-lg lg:font-bold   md:block  hover:bg-indigo-500 rounded border border-indigo-700 text-white  sm:px-8 py-1 sm:py-3 text-sm">
              Create Vehicle</button>
          </Link>
   </div>
   <div className="grid  grid-cols-1 gap-4  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {Array.isArray(transportData) && transportData.length > 0 ? (
        transportData.map((transport) => (
          <div key={transport._id} className="my-2 ">

<div className="flex w-full items-center justify-center ">
                  <div class="max-w-sm  overflow-hidden  rounded-xl  shadow-2xl shadow-blue-300">
                    <img
                       class="w-full h-72"
                      src={`${process.env.REACT_APP_SERVER_URL}/${transport.photo}`}
                      alt="Sunset in the mountains"
                    />
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">{transport.name}</div>
                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Number</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">
                            {transport.number}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Capacity</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">
                            {transport.capacity}+1
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-6  grid grid-cols-3 mx-auto">
                    <button className="rounded-xl w-4/5 px-3 py-2 mx-auto  bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold"
                        onClick={() => handleBookingClick(transport._id, transport.name)}
                      >
                        Book Vehicle
                      </button>
                    {userData.email === process.env.REACT_APP_MASTER_ADMIN_EMAIL || userData.email === transport.transportCreater  ? 
                   <>
                      <button className="rounded-xl w-4/5 px-3 py-2 mx-auto  bg-blue-700 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold"
                        onClick={() => handleEditClick(transport._id, transport.name)}
                      >
                        Edit Vehicle
                      </button>

                      <button className="rounded-xl w-4/5 px-3 py-2 mx-auto  bg-red-700 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold"
                       
                        onClick={() =>
                          handleDeleteModal(transport._id, transport.name)
                        }
                        >
                        Delete Vehicle
                      </button>
                        </>

                    : <></>}
                 
                    </div>
                  </div>
                </div>

                
          </div>
        

      
        

        ))
      ) : (
        <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No transports found.</h2>

      )}

      </div>
      </div>
} */}

  

{showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete {selectedTransportName}?
            </h2>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none"
                onClick={() =>
                  handleDeleteClick(selectedTransportId)
                }
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        </>
  );
  
};

export default TransportsAdmin;
