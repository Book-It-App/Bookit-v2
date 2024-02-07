import React from 'react'


import maintenance from '../assets/maintenance.jpg'




const Maintenance = () => {
  return (
    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
  <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
    <div class="relative">
      <div class="absolute">
        <div class="">
          <h1 class="my-2 text-gray-800 font-bold text-3xl">
            Website under maintenance
          </h1>
          <p class="my-2 text-gray-800">We are currently performing maintenance on our website. We will get back soon.</p>
          {/* <button class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me there!</button> */}
        </div>
      </div>
      {/* <div className="w-full lg:w-1/2">
        <img src={maintenance}  alt="maintenanceimage"/>
      </div> */}
    </div>
  </div>
  <div className="w-full lg:w-1/2">
  <img src={maintenance}  alt="maintenanceimage"/>
  
  </div>
</div>
  )
}

export default Maintenance