import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Notification from "./Notification";

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const isOpenMenu = useSelector((store) => store.menu.openMenu);
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const breadcrumb = pathSegments.map((segment, index) => {
    const formattedSegment = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <span key={index} className="flex items-center">
        {index > 0 && <span className="mx-2 text-xl">{">"}</span>}
        {index === pathSegments.length - 1 ? (
          <span className="text-blue-600 text-nowrap block">
            {formattedSegment}
          </span>
        ) : (
          <Link
            to={`/${pathSegments.slice(0, index + 1).join("/")}`}
            className="text-gray-500"
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
        {location.pathname === "/admin" ||
        location.pathname === "/resident" ||
        location.pathname === "/security" ? (
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ) : (
          <div>
            <p className={`xl:ms-0 hidden md:flex ${isOpenMenu ? "hidden md:hidden" : "block ms-10"}`}>
              {breadcrumb}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <Notification />
        <Link
          to={`/${user?.user_role === "admin" ? "admin" : user?.user_role === "resident" ? "resident" : "security"}/profile`} className="flex items-center space-x-2">
          <img
            src={user?.profile_picture}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-col text-left leading-5 hidden sm:flex">
            <span className="font-medium text-gray-700 capitalize">
              {user?.user_role === "admin"
                ? `${user?.firstname || ""} ${user?.lastname || ""}`
                : user?.user_role === "resident"
                ? user.fullName
                : user.fullName}
            </span>
            <span className="text-sm text-left text-gray-400">
              {user?.user_role === "admin"
                ? "Admin"
                : user?.user_role === "resident"
                ? "Resident"
                : "Security"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
