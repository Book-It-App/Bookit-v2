import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
// import { useParams } from "react-router-dom";
// import BookingForm from "./BookingForm";
import notVerified from "../../../assets/notVerified.jpg";
// import { tr } from "date-fns/locale";
const TransportFrom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  // const { transportId, transportName } = useParams();
  // const [existingPhoto, setExistingPhoto] = useState("");
  const [transportData, setTransportData] = useState({
    // name: "",

    // number: "",
    // tansportType: "",
    // nameOfDriver: "",
    // mobNoOfDriver: "",
    // capacity: "",
    // photo: null,
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [transportCreater, setTransportCreater] = useState("");

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
      setTransportCreater(data.email);

      // console.log(data.email);

      if (data.emailVerified) {
        setEmailVerified(true);
      }

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const data = error.response.data;
          // Handle validation errors
          // You can set specific error messages for different fields if needed
          if (data && data.errors) {
            const errorMessage = data.errors.join(", ");
            toast.error(errorMessage);
          }
        } else if (error.response.status === 403) {
          toast.error("Unauthorized request!");
        } else {
          console.error(error);
          toast.error("An error occurred while updating the transport.");
        }
      } else {
        console.error(error);
        toast.error("An error occurred while updating the transport.");
      }
    }
  };

  useEffect(() => {
    userContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const formData = new FormData();
  // formData.append('name', transportData.name);
  // formData.append('number', transportData.number);
  // formData.append('capacity', transportData.capacity);
  // formData.append('photo', transportData.photo); // Assuming transportData.photo is the file object

  const CreateTransport = async (e) => {
    e.preventDefault();
    const { name, number, transportType,nameOfDriver,mobNoOfDriver } = transportData;
    // const {transportCreater} = transportCreater;
    // setIsLoading(true)
    console.log(transportData);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/transport-booking-system/transports`,
        {
          name,
          number: number.toUpperCase(),
          transportType,
          nameOfDriver,
          mobNoOfDriver,
          transportCreater,
   
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setIsLoading(false);

      if (!data) {
        toast.error("Request not send!");
        // console.log("Message not send");
      } else {
        toast.success("Vehicle Created Successfull!");
        // alert("Message send");
        navigate("/transport-booking-system/transports");
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        setAuthStatus(data.error);
        // console.log(data.error);
        // window.alert(data.error);
      } else {
        console.error(error);
      }
      // console.log(error);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setTransportData({ ...transportData, photo: file });
  //   setExistingPhoto(URL.createObjectURL(file));
  //   console.log(transportData);
  // };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTransportData({ ...transportData, [name]: value });
    console.log(transportData);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : !emailVerified ? (
        <div class="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
          <div class="w-full lg:w-1/3">
            <img alt="error" class="hidden lg:block" src={notVerified} />
          </div>
          <div class="w-full lg:w-1/2">
            <h1 class="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">
              Looks Like Yout Have Not Verified Your Email!
            </h1>
            <p class="py-4 text-xl text-gray-800">
              Please click on the below button and verify email before booking.
            </p>
            <div>
              <Link to="/profile">
                <button class="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Verify Email
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                Create Vehicle
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Create Your <span className="text-indigo-600">Vehicle </span>
              </h3>
            </div>

            <form method="POST" className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-vehicle-name">
                    Vehicle Name
                  </label>
                  <input
                    value={transportData.name}
                    name="name"
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-vehicle-name"
                    type="text"
                    placeholder="VEHICLE NAME"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-vehicle-number">
                    Vehicle Number
                  </label>
                  <input
                    className="appearance-none block w-full uppercase bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-vehicle-number"
                    type="text"
                    value={transportData.number}
                    name="number"
                    onChange={handleInputs}
                    placeholder="Vehicle Number"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-tansport-type">
                    Vehicle Type
                  </label>
                  <select
    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    id="grid-tansport-type"
    name="transportType"
    value={transportData.transportType}
    onChange={handleInputs}>
    <option value="">Select</option>
    <option value="bus">Bus</option>
    <option value="car">Car</option>
   
  </select>
                 
                </div>


                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-nameof-driver">
                    Driver Name
                  </label>
                  <input
                    value={transportData.nameOfDriver}
                    name="nameOfDriver"
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nameof-driver"
                    type="text"
                    placeholder="DRIVER NAME"
                  />
                </div>

              
              </div>



              <div className="flex flex-wrap -mx-3 mb-6">
              
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-mob-no-of-driver">
                    Driver Mob.No
                  </label>
                  <input
                    value={transportData.mobNoOfDriver}
                    name="mobNoOfDriver"
                    onChange={handleInputs}
                    
                  
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-mob-no-of-driver"
                    type="number"
                    placeholder="DRIVER MOB.NO."
                  />
                </div>

              
              </div>




              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="flex justify-between w-full px-3">
                  <button
                    // onClick={() => setShowModal(true)}
                    onClick={CreateTransport}
                    className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                    type="submit">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ) */}
      {/* ) */}
      {/* )  */}
      {/* : (
        <h2 className="text-2xl font-bold text-zinc-700  text-center mt-4">No transports found.</h2>

      )} */}

      {/* } */}
    </>
  );
  // <RenderModal/>
};

export default TransportFrom;
