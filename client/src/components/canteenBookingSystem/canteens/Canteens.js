import React, { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner";
import Cart from "./Cart";
// import BookingForm from "./BookingForm";
import { AiOutlinePlus, AiOutlineMinus  } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
const Canteens = () => {
  const navigate = useNavigate();
  const [canteenData, setCanteenData] = useState([]);
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
      setCanteenData(data.canteens);
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

  // const handleInputs = (itemId, quantity) => {
  //   setSelectedItems((prevSelectedItems) => ({
  //     ...prevSelectedItems,
  //     [itemId]: {
  //       ...prevSelectedItems[itemId],
  //       quantity: quantity,
  //     },
  //   }));
  //   console.log(selectedItems);
  // }

  // const handleRemoveFromCart = (itemId) => {
  //   setSelectedItems((prevSelectedItems) => {
  //     // Create a copy of the previous selected items object
  //     const updatedSelectedItems = { ...prevSelectedItems };
  
  //     // Remove the item with the specified itemId
  //     delete updatedSelectedItems[itemId];
  
  //     // Return the updated selected items object
  //     return updatedSelectedItems;
  //   });
  // };
  const handleItemSelect = (itemId, itemName, quantity) => {
    setSelectedItems((selectedItems) => ({
      ...selectedItems,
      [itemId]: {  itemName,quantity },
    }));
    console.log(selectedItems);
    setShowSidebar(true);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

  };

  const handleSidebarClose = () => {
    setShowSidebar(false);
  };

  let totalQuantity = 0;
for (const itemId in selectedItems) {
  totalQuantity += selectedItems[itemId].quantity;
}
  // const canteenId =canteenData.canteenId
  // const canteenName = canteenData.canteenName

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









         

<Cart selectedItems={selectedItems} navigate={navigate} totalQuantity={totalQuantity} setShowSidebar={setShowSidebar} setSelectedItems={setSelectedItems} showSidebar={showSidebar} />

{/* 
            <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] h-full p-5 bg-white mb-3 ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3">
          <span className="text-xl font-bold text-gray-800">My Cart</span>
          <IoMdClose
            onClick={() => setShowSidebar(!showSidebar)}
            className=" text-gray-600 font-bold  p-1 text-3xl  rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>
        {Object.keys(selectedItems).length > 0 ? (
  Object.entries(selectedItems).map(([itemId, { itemName, quantity }]) => (


<div key={itemId} className="flex gap-2 shadow-md rounded-lg p-2 mb-3">
      <MdDelete
        onClick={() => {
          handleRemoveFromCart(itemId);
        }}
        className="absolute right-7 text-gray-600 cursor-pointer"
      />    
        <img src={"../../../assets/logo.png"} alt="" className="w-[50px] h-[50px] " />

      
      <div className="leading-5">
        <h2 className="font-bold text-gray-800">{itemName}</h2>
        <div className="flex justify-between ">
        <span className="text-green-500 font-bold">₹</span>

          <div className="flex justify-center items-center gap-2 absolute right-7">
            <AiOutlineMinus
              onClick={() =>  
                quantity > 1 ? handleInputs(itemId, quantity - 1) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
            <span className="">{quantity}</span>
            <AiOutlinePlus
               onClick={() =>  
                quantity >= 1 ? handleInputs(itemId, quantity + 1) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>


               
                  ))
                  ) : (
                    <h2 className="text-center text-xl font-bold text-gray-800">
                      Your cart is empty
                    </h2>
                  )}

     

        <div className="absolute bottom-0 ">
          <h3 className="font-semibold text-gray-800">Total Items : {Object.keys(selectedItems).length}
           </h3>
          <h3 className="font-semibold text-gray-800">
            Total Quantity : {totalQuantity}
          </h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            onClick={() =>{navigate('/canteen-booking-system/bookingForm', { state: { selectedItems } })}}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5"
          >
            Continue
          </button>

       
        </div>
      </div>
    
      </> */}
        
      {/* <FaShoppingCart
        onClick={() => setShowSidebar(!showSidebar)}
        className={`rounded-full bg-white shadow-md text-4xl p-3 fixed bottom-4 right-4 
        ${{totalQuantity} > 0 && "animate-bounce delay-500 transition-all"}
        `}
      /> */}
              {/* Sidebar */}
              {/* <div className="fixed top-20 left-0 bg-white w-96 p-4 shadow-lg">
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
              </div> */}
            </div>













































            <div className="flex-grow">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
                Available <span className="text-indigo-700"> Menu Items</span>{" "}
              </h1>
              <div className="grid  grid-cols-1   md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {Array.isArray(canteenData) && canteenData.length > 0 ? (
                  canteenData.map((canteen) => (
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
                    
                    // onChange={(e) => handleInputs(canteen._id, e.target.value)}
                    
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
          
          
        // </div>

      )}
       {/* <FaShoppingCart
        onClick={() => setShowSidebar(!showSidebar)}
        className={` bg-white shadow-md text-6xl p-3 text-indigo-800 fixed bottom-4 right-4 
        ${{totalQuantity} > 0 && "animate-bounce delay-500 transition-all"}
        `}
      /> */}
    </>
  );
  
                }
export default Canteens;
