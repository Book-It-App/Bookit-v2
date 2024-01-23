import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
import { useParams } from "react-router-dom";
// import BookingForm from "./BookingForm";

const CanteensEdit = () => {
  const navigate = useNavigate();
  const [canteenData, setCanteenData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [authStatus, setAuthStatus] = useState("");
  const { canteenId } = useParams();
  const [existingPhoto, setExistingPhoto] = useState('');
  const [existingPhotoName, setExistingPhotoName] = useState('');
  // const [uploadedPhotoName, setUploadedPhotoName] = useState('');
  const getCanteensData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/canteen-booking-system/canteens/${canteenId}`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data.canteen);
      setCanteenData(data.canteen);
      
      setExistingPhoto(
        `${process.env.REACT_APP_SERVER_URL}/${data.canteen.photo}`
      );
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getCanteensData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateCanteenForm = async (e) => {
    e.preventDefault();
    const { name, photo } = canteenData;

   
    
 

  // if (canteenData.photo instanceof File) {
  //   dataToSend.photo = canteenData.photo;
  // } else if (!canteenData.photo && existingPhoto) {
  //   dataToSend.photo = existingPhoto;
  // }

    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/canteen-booking-system/canteens/${canteenId}`,
        {
          name,
          photo
          
        }
        ,
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (!data) {
        toast.error("Request not send!");
        // console.log("Message not send");
      } else {
        toast.success("Menu Item Updated Successfull!");
        // alert("Message send");
        navigate("/canteen-booking-system/canteens");
        // setBookingData({ ...bookingData });
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
            setAuthStatus(errorMessage);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCanteenData({ ...canteenData, photo: file });
      setExistingPhoto(URL.createObjectURL(file));
      setExistingPhotoName(file.name);
    }
  };
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCanteenData({ ...canteenData, [name]: value });
  };

  // const canteenId =userData.canteenId
  // const canteenName = userData.canteenName

  // const handleBookingClick = (canteenId,canteenName) => {
  //   navigate('/bookingForm', { state: { canteenId, canteenName } });

  // };

  // const handleBookingClick = () => {
  //   sendData(data);
  // };
  // const inputPhoto = document.querySelector("grid-photo");
  // inputPhoto.style.opacity = 0;
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                Update Menu Item
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Update Your <span className="text-indigo-600">Menu Item </span>
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
    htmlFor="grid-photo"
  >
    Photo of Menu Item
  </label>
  {/* Display the existing image if available */}
  {existingPhoto && (
    <img src={existingPhoto} alt="Existing" />
  )}
  <div className="relative">
    <label
      htmlFor="grid-photo"
      className="cursor-pointer bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 block w-full font-bold  text-center"
    >
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
  <p>Photo : {existingPhotoName || existingPhoto.split('\\').pop()}</p>
)}


</div>
              </div>

              {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-capacity">
                    Seating Capacity
                  </label>
                  <input
                    value={canteenData.capacity}
                    name="capacity"
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
    htmlFor="grid-photo"
  >
    Photo of Menu Item
  </label>
 
  {existingPhoto && (
    <img src={existingPhoto} alt="Existing" />
  )}
  <div className="relative">
    <label
      htmlFor="grid-photo"
      className="cursor-pointer bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 block w-full font-bold  text-center"
    >
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
  <p>Photo : {existingPhotoName || existingPhoto.split('\\').pop()}</p>
)}


</div>

              </div> */}

           

              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                {/* <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Your Message
                </label>
                <textarea
                  value={bookingData.message}
                  name="message"
                  onChange={handleInputs}
                  rows="10"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
              </div> */}

                <div className="flex justify-between w-full px-3">
                  <button
                    onClick={UpdateCanteenForm}
                    className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                    type="submit">
                    Update
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
};

export default CanteensEdit;
