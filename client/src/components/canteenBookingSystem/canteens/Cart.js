import React, { useState ,useEffect } from "react";

import { AiOutlinePlus, AiOutlineMinus  } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Cart = ({ selectedItems,  navigate,setSelectedItems, setShowSidebar, showSidebar }) => {




  useEffect(() => {
    // Retrieve selectedItems from localStorage
    const storedSelectedItems = localStorage.getItem('selectedItems');
    if (storedSelectedItems) {
      setSelectedItems(JSON.parse(storedSelectedItems));
    }
  }, []);

  const handleInputs = (itemId, quantity) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: {
        ...prevSelectedItems[itemId],
        quantity: quantity,
      },
    }));
    console.log(selectedItems);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

  }

  const handleRemoveFromCart = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      // Create a copy of the previous selected items object
      const updatedSelectedItems = { ...prevSelectedItems };
  
      // Remove the item with the specified itemId
      delete updatedSelectedItems[itemId];
  
      // Return the updated selected items object
      return updatedSelectedItems;
    });
  };
 



  let totalQuantity = 0;
for (const itemId in selectedItems) {
  totalQuantity += selectedItems[itemId].quantity;
}
  return (
   
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


                  // <div key={itemId} className="mb-2">
                  //   <p>
                  //     {itemName} , Quantity: {quantity}
                  //   </p>
                  // </div>
                  ))
                  ) : (
                    <h2 className="text-center text-xl font-bold text-gray-800">
                      Your cart is empty
                    </h2>
                  )}

         {/* {cartItems.length > 0 ? (
          cartItems.map((food) => {
            return <ItemCard key={food.id} {...food} />;
          })
        ) : ( 
          <h2 className="text-center text-xl font-bold text-gray-800">
            Your cart is empty
          </h2>
         )}  */}

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

          {/* <Link to={"/canteen-booking-system/bookingForm"}
                  state= { selectedItems } 
                  className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5"
                  // onClick={() =>
                              //   handleBookingClick()
                              // }
                            >
                              Book Now form
                            </Link> */}
        </div>
      </div>
    
        
      <FaShoppingCart
        onClick={() => setShowSidebar(!showSidebar)}
        className={` bg-white shadow-md text-6xl p-3 text-indigo-800 fixed bottom-4 right-4 
        ${{totalQuantity} > 0 && "animate-bounce delay-500 transition-all"}
        `}
      />
    </>
  );
};

export default Cart;
