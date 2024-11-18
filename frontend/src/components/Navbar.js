import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Popover } from "@headlessui/react";

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const isOpenMenu = useSelector((store) => store.menu.openMenu);
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const breadcrumb = pathSegments.map((segment, index) => {
    const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);
    return (
      <span key={index} className="flex">
        {index > 0 && " > "}
        {index === pathSegments.length - 1 ? (
          <span className="text-gray-500 w-48 block">{formattedSegment}</span>
        ) : (
          <Link
            to={`/${pathSegments.slice(0, index + 1).join("/")}`}
            className="text-blue-600"
          >
            {formattedSegment}
          </Link>
        )}
      </span>
    );
  });

  return (
    <div className="w-full bg-white shadow py-4 px-6 flex items-center justify-between">
      <div className="w-56">
        {location.pathname === "/admin" || location.pathname === "/resident" ? (
          <div
            className={`items-center relative w-1/4 xl:ms-0 hidden md:flex ${
              !isOpenMenu && "ms-10"
            }`}
          >
            <span className="absolute left-3 text-gray-400">
              <img src="/assets/search-Bordere.svg" alt="" />
            </span>
            <input
              type="text"
              placeholder="Search Here"
              className="pl-10 pr-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ) : (
          <div>
            <p className={`xl:ms-0 hidden md:flex ${!isOpenMenu && "ms-10"}`}>
              {breadcrumb}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <Popover className="relative">
          <Popover.Button className="relative focus:outline-none p-2 border border-gray-200 rounded-xl hover:shadow-md">
            <img src="/assets/notification-bing.svg" alt="" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Popover.Button>

          <Popover.Panel className="absolute right-0 mt-2 w-[484px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notification</h3>
              <button className="text-sm text-blue-600 hover:underline">
                Clear all
              </button>
            </div>
            <div className="py-2 max-h-96 overflow-y-auto">
              <div className="p-4 flex flex-col items-center">
                <img src="/assets/no-notification.png" alt="" />
                <h3 className="text-center text-[#4F4F4F] font-[20px]">
                  No notification yet!
                </h3>
              </div>
            </div>
          </Popover.Panel>
        </Popover>

        <Link
          to={!user.role && "/admin/profile"}
          className="flex items-center space-x-2"
        >
          <img
            src={user?.profile_picture}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-col text-left leading-5 hidden sm:flex">
            <span className="font-medium text-gray-700">
              {user.role
                ? user.fullName
                : `${user?.firstname || ""} ${user?.lastname || ""}`}
            </span>
            <span className="text-sm text-left text-gray-400">
              {user.role ? "Resident" : "Admin"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
