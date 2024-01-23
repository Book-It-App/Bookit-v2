import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner";

// import BookingForm from "./BookingForm";

const Canteens = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getCanteensData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/canteen-booking-system/canteens`,
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
      setUserData(data.canteens);
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

  const handleBookingClick = (canteenId, canteenName) => {
    navigate(
      `/canteen-booking-system/bookingForm/${canteenId}/${canteenName}`
    );
  };

  // const canteenId =userData.canteenId
  // const canteenName = userData.canteenName

  // const handleBookingClick = (canteenId,canteenName) => {
  //   navigate('/bookingForm', { state: { canteenId, canteenName } });

  // };

  // const handleBookingClick = () => {
  //   sendData(data);
  // };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 min-h-screen ">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
            Available <span className="text-indigo-700"> Menu Items</span>{" "}
          </h1>
          <div className="grid  grid-cols-1   md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {Array.isArray(userData) && userData.length > 0 ? (
            userData.map((canteen) => (
              <div key={canteen._id} className="my-2 ">

                <div className="flex w-full items-center justify-center ">
                
                  <div class="max-w-sm  overflow-hidden  rounded-xl  shadow-2xl shadow-blue-300">
                    <img
                      class="w-full h-72"
                      src={`${process.env.REACT_APP_SERVER_URL}/${canteen.photo}`}
                      alt="munu item"
                    />
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">{canteen.name}</div>
                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Number</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">
                            {canteen.number}
                          </p>
                        </div>
                      </div>

                      {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Capacity</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">
                            {canteen.capacity}+1
                          </p>
                        </div>
                      </div> */}
                    </div>
                    <div className="my-6 w-1/2  grid grid-cols-1 mx-auto">
                      <button
                        className=" rounded  px-2 py-2  bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold"
                        onClick={() =>
                          handleBookingClick(canteen._id, canteen.name)
                        }>
                        Book Now
                      </button>
                 
                    </div>
                  </div>
                </div>

               
              </div>
            ))
          ) : (
            <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
              No canteens found.
            </h2>
          )}
        </div> </div>
      )}
    </>
  );
};

export default Canteens;
