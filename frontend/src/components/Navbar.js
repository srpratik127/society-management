import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow py-4 px-6 flex items-center justify-between">

      <div className="flex items-center relative w-1/4">
        <span className="absolute left-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 12.65z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search Here"
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex items-center space-x-6">
       
        <button className="relative focus:outline-none p-2 border border-gray-200 rounded-xl hover:shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h9zm0 0v1a3 3 0 11-6 0v-1h6z"
            />
          </svg>
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

       
        <div className="flex items-center space-x-2">
          <img
            src="/assets/Avatar.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-right">
            <span className="font-medium text-gray-700">Moni Roy</span>
            <span className="text-sm text-gray-400">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
