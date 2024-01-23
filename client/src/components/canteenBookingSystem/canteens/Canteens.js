import React, { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner";

// import BookingForm from "./BookingForm";

const Canteens = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);


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

  // const handleBookingClick = () => {
  //   navigate({
  //     pathname: `/canteen-booking-system/bookingForm`,
  //     state: { selectedItems  },
  //   });
  // };

  const handleInputs = (itemId, quantity) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: {
        ...prevSelectedItems[itemId],
        quantity: quantity,
      },
    }));
  }


  const handleItemSelect = (itemId, itemName, quantity) => {
    setSelectedItems((selectedItems) => ({
      ...selectedItems,
      [itemId]: {  itemName,quantity },
    }));
    setShowSidebar(true);
  };

  const handleSidebarClose = () => {
    setShowSidebar(false);
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
          <div className="flex">
            <div className={`w-1/4  ${showSidebar ? 'block' : 'hidden'}`}>
              {/* Sidebar */}
              <div className="fixed  right-0 bg-white w-64 p-4 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Selected Items</h2>

                {Object.entries(selectedItems).map(([itemId, { itemName,quantity}]) => (
                  <div key={itemId} className="mb-2">
                    <p>
                      {itemName} , Quantity: {quantity}
                    </p>
                  </div>
                ))} 
                <Link to={"/canteen-booking-system/bookingForm"}
                  state= { selectedItems } 
                              className="rounded px-2 py-2  bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold"
                              // onClick={() =>
                              //   handleBookingClick()
                              // }
                            >
                              Book Now form
                            </Link>

                <button
                  className="bg-indigo-700 text-white px-3 py-2 rounded"
                  onClick={handleSidebarClose}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-grow">
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
                                <p className="font-bold text-zinc-700">Quantity</p>
                              </div>
                              <div>
                              <input
                    className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded text-center leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-quantity"
                    type="number"
                    value={selectedItems[canteen._id]?.quantity || 1}
                    name="quantity"
                    min="1"
                    
                    onChange={(e) => handleInputs(canteen._id, e.target.value)}
                    
                  />
                                <p className="text-m font-semibold text-zinc-700">
                                  {canteen.quantity} 
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="my-6 w-1/2  grid grid-cols-1 mx-auto">
                            {/* <button
                              className="rounded px-2 py-2  bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold"
                              onClick={() =>
                                handleBookingClick(canteen._id, canteen.name)
                              }
                            >
                              Book Now
                            </button> */}
                            <button
            className="rounded px-2 py-2  bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold"
            onClick={() => handleItemSelect(canteen._id, canteen.name, selectedItems[canteen._id]?.quantity || 1)}
            
            // Assuming quantity is set to 1
          >
            Select Item
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
                }
export default Canteens;
