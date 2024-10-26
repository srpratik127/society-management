import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow py-4 px-6 flex items-center justify-between">
      <div className="flex items-center relative w-1/4">
        <span className="absolute left-3 text-gray-400">
          <img src="/assets/search-Bordere.svg" alt="" />
        </span>
        <input
          type="text"
          placeholder="Search Here"
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative focus:outline-none p-2 border border-gray-200 rounded-xl hover:shadow-md">
          <img src="/assets/notification-bing.svg" alt="" />

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
            <span className="text-sm text-left text-gray-400">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
