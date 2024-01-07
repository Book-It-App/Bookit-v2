import React from 'react';
import { Link } from 'react-router-dom';

const MasterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Book It Master Page</h1>
      <div className="flex gap-8">
        {/* Hall Booking System */}
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Hall Booking System</h2>
          <Link to="/hall-booking-system" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Go to Hall Booking
          </Link>
        </div>

        {/* Transport Booking System */}
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Transport Booking System</h2>
          <Link to="/transport-booking-system" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Go to Transport Booking
          </Link>
        </div>

        {/* Canteen Booking System */}
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Canteen Booking System</h2>
          <Link to="/canteen-booking-system" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
            Go to Canteen Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;
