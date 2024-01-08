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
        toast.success("Transport Deleted Successfull!")
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


  const handleBookingClick = (transportId, transportName) => {
    navigate(`/transport-booking-system/bookingForm/${transportId}/${transportName}`)
  };

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
<>{isLoading ? (
          <LoadingSpinner />
        ) : 
    <div className="mt-6 min-h-screen"> 
    
   <div className="py-5 md:py-0 flex container mx-auto px-6 justify-between  items-center">
   <div className="mx-auto ">
    <h1 className="text-xl  sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
   Available <span className="text-indigo-700"> Transports</span>  </h1>

   </div>
   <Link to="/transport-booking-system/transportForm">
            <button className="flex self-end focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700  md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  sm:px-8 py-1 sm:py-3 text-sm">
              Create Transport</button>
          </Link>
   </div>

      {Array.isArray(transportData) && transportData.length > 0 ? (
        transportData.map((transport) => (
          <div key={transport._id} className="my-2 ">
            <div className="flex w-full items-center justify-center">
              <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-8/12 bg-white">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* <div className="grid-cols-1 lg:col-span-3">
                    <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-blue-100 p-4">
                      <svg
                        id="logo-39"
                        width="50"
                        height="40"
                        viewBox="0 0 50 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z"
                          fill="#A5B4FC"
                          className="ccompli2"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z"
                          fill="#4F46E5"
                          className="ccustom"
                        ></path>
                        <path
                          d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z"
                          fill="#A5B4FC"
                          className="ccompli2"
                          fill-opacity="0.3"
                        ></path>
                      </svg>
                    </div>
                  </div> */}

                  <div className="col-span-1 lg:col-span-9">
                    <div className="text-center lg:text-left">
                      <h2 className="text-2xl font-bold text-zinc-700">{transport.name}</h2>
                      {/* <p className="mt-2 text-l font-semibold text-zinc-700">{transport.number}</p> */}
                      {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                    </div>

                    {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Transport Id</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{transport._id}</p>
                      </div>
                    </div> */}


                    {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-bold text-zinc-700">Name</p>
                </div>

                <div>
                  <p className="text-m font-semibold text-zinc-700">Name</p>
                </div>
              </div> */}


                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Number</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{transport.number}</p>
                      </div>
                    </div>



                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Capacity</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{transport.capacity}</p>
                      </div>
                    </div>


                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Photo</p>
                      </div>

                      <div>
                      <img src={`${process.env.REACT_APP_SERVER_URL}/${transport.photo}`} alt="photos"  />
                        {/* <p className="text-m font-semibold text-zinc-700">{transport.photo}</p> */}
                      </div>
                    </div>

                    {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Description</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{transport.description}</p>
                      </div>
                    </div> */}









                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {/* <Link to={`/bookingForm`}> */}
                      <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => handleBookingClick(transport._id, transport.name)}
                      >
                        Book Now
                      </button>
                {userData.email === process.env.REACT_APP_MASTER_ADMIN_EMAIL || userData.email === transport.transportCreater  ? 
                <>
                      <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => handleEditClick(transport._id, transport.name)}
                      >
                        Edit Transport
                      </button>

                      <button className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                        // onClick={() => handleDeleteClick(transport._id, transport.name)}
                        // onClick={() => setShowModal(true)} 
                        onClick={() =>
                          handleDeleteModal(transport._id, transport.name)
                        }
                        >
                        Delete Transport
                      </button>
                        </>

                    : <></>}
                      {/* </Link> */}
                      {/* <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">
                  View Profile
                </button> */}
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        

      
        

        ))
      ) : (
        <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No transports found.</h2>

      )}

      </div>
}

  
{/* 
      {
        showModal &&
              
        <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-14 rounded-md text-center">
              <h1 class="text-xl mb-4 font-bold text-slate-500">Do you Want Delete</h1>
              <button onClick={() => handleDeleteClick(transport._id, transport.name)} class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
              <button onClick={() => setShowModal(false)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancel</button>
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
