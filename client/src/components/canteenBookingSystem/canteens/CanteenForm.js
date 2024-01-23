import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
// import { useParams } from "react-router-dom";
// import BookingForm from "./BookingForm";
import notVerified from "../../../assets/notVerified.jpg";
const CanteenFrom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  // const { canteenId, canteenName } = useParams();
  const [existingPhoto, setExistingPhoto] = useState("");
  const [canteenData, setCanteenData] = useState({
    name: "",
    photo: null,
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [canteenCreater, setCanteenCreater] = useState("");

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
      setCanteenCreater(data.email);

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
          toast.error("An error occurred while updating the canteen.");
        }
      } else {
        console.error(error);
        toast.error("An error occurred while updating the canteen.");
      }
    }
  };

  useEffect(() => {
    userContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const formData = new FormData();
  // formData.append('name', canteenData.name);
  // formData.append('number', canteenData.number);
  // formData.append('capacity', canteenData.capacity);
  // formData.append('photo', canteenData.photo); // Assuming canteenData.photo is the file object

  const CreateCanteen = async (e) => {
    e.preventDefault();
    const { name, photo } = canteenData;
    // const {canteenCreater} = canteenCreater;
    // setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/canteen-booking-system/canteens`,
        {
          name,
          photo,
          canteenCreater,
          // formData
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      setIsLoading(false);

      if (!data) {
        toast.error("Request not send!");
        // console.log("Message not send");
      } else {
        toast.success("Menu Item Created Successfull!");
        // alert("Message send");
        navigate("/canteen-booking-system/canteens");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCanteenData({ ...canteenData, photo: file });
    setExistingPhoto(URL.createObjectURL(file));
    console.log(canteenData);
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCanteenData({ ...canteenData, [name]: value });
    console.log(canteenData);
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
                Create Menu Item
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Create Your <span className="text-indigo-600">Menu Item </span>
              </h3>
            </div>

            <form method="POST" className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-menu item-name">
                    Menu Item Name
                  </label>
                  <input
                    value={canteenData.name}
                    name="name"
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-menu item-name"
                    type="text"
                    placeholder="Menu Item Name"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-photo">
                    Photo of Menu Item
                  </label>
                  {/* Display the existing image if available */}
                  {existingPhoto && <img src={existingPhoto} alt="Existing" />}
                  <div className="relative">
                    <label
                      htmlFor="grid-photo"
                      className="cursor-pointer bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 block w-full font-bold  text-center">
                      Choose image of menu item
                    </label>
                    <input
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                      id="grid-photo"
                      type="file"
                    />
                  </div>
                  {existingPhoto && (
                    <p>
                      Selected Photo :{" "}
                      {canteenData.photo.name ||
                        existingPhoto.split("\\").pop()}
                    </p>
                  )}
                </div>
              </div>
{/* 
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-capacity">
                    Seating Capacity
                  </label>
                  <input
                    value={canteenData.capacity}
                    name="capacity"
                    max={6}
                    onChange={handleInputs}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-capacity"
                    type="number"
                    placeholder="Capacity"
                  />
                </div>

                

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-photo">
                    Photo of Menu Item
                  </label>
                  {existingPhoto && <img src={existingPhoto} alt="Existing" />}
                  <div className="relative">
                    <label
                      htmlFor="grid-photo"
                      className="cursor-pointer bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 block w-full font-bold  text-center">
                      Choose image of menu item
                    </label>
                    <input
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                      id="grid-photo"
                      type="file"
                    />
                  </div>
                  {existingPhoto && (
                    <p>
                      Selected Photo :{" "}
                      {canteenData.photo.name ||
                        existingPhoto.split("\\").pop()}
                    </p>
                  )}
                </div>
              </div> */}

              {/* <div className="flex flex-wrap -mx-3 mb-6">
  
  
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="grid-description"
                >
                  Description
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-description"
                  type="text"
                  value={canteenData.description}
                  name="description"
                  onChange={handleInputs}
                  placeholder="Description"
                />
              </div>
            
            </div> */}

              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="flex justify-between w-full px-3">
                  <button
                    // onClick={() => setShowModal(true)}
                    onClick={CreateCanteen}
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
        <h2 className="text-2xl font-bold text-zinc-700  text-center mt-4">No canteens found.</h2>

      )} */}

      {/* } */}
    </>
  );
  // <RenderModal/>
};

export default CanteenFrom;
