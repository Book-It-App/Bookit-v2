import React from 'react'
import Transports from '../transports/Transports'
import Events from '../transportBookings/Events'

const FacultyDashboard = () => {
  return (
    <>


<div className='mt-6 min-h-screen'>
<h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
      Transport  <span className="text-indigo-700">Booking</span> </h1>
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
      Faculty  <span className="text-indigo-700">Dashboard</span> </h1>





      <div className='mt-6 grid grid-flow-col col-auto	'>
        <div >
          <Transports />
        </div>
        <div >
          {/* <Events /> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default FacultyDashboard