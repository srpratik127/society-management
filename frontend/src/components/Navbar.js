import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover } from "@headlessui/react";
import axios from "axios";
import { initialNotification } from "../store/NotificationSlice";
import { format } from "timeago.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const notification = useSelector((store) => store.notification.notification);
  const isOpenMenu = useSelector((store) => store.menu.openMenu);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/notifications/${user._id}`
        );
        dispatch(initialNotification(response.data));
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchNotification();
  }, []);

  const handleClearSingleNotification = async (notificationId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/notifications/clear/${user._id}/${notificationId}`
      );
      const updatedNotifications = notification.filter(
        (item) => item._id !== notificationId
      );
      dispatch(initialNotification(updatedNotifications));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/notifications/${user._id}`
      );
      dispatch(initialNotification([]));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const breadcrumb = pathSegments.map((segment, index) => {
    const formattedSegment = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <span key={index} className="flex items-center">
        {index > 0 && <span className="mx-2 text-xl">{">"}</span>}
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
            <span
              className={`absolute top-1 right-1 ${
                notification?.length > 0 ? "h-4 w-4" : "h-2 w-2"
              } bg-red-500 text-white rounded-full text-[10px]`}
            >
              {notification?.length > 0 && notification?.length}
            </span>
          </Popover.Button>

          <Popover.Panel className="absolute right-0 mt-2 w-[484px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            {({ close }) => (
              <>
                <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Notification</h3>
                  {notification?.length > 0 && (
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={handleClearNotifications}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="py-2 max-h-96 overflow-y-auto">
                  <div className="p-4 flex flex-col items-center">
                    {notification?.length > 0 ? (
                      notification.map((item) => (
                        <div
                          key={item._id}
                          className="w-full flex items-start gap-3 p-2 border rounded-lg mb-2"
                        >
                          <p className="w-12 h-12 bg-[#e74d3c81] text-[#E74C3C] rounded-full text-center text-xl leading-[3rem]">
                            {item.name?.charAt(0).toUpperCase()}
                          </p>
                          <div className="w-full">
                            <h2 className="text-lg font-semibold">
                              {item.title}
                            </h2>
                            <p className="text-[#4F4F4F]">
                              Name:{" "}
                              <span className="text-blue-500">{item.name}</span>
                            </p>
                            <p className="text-[#4F4F4F] my-2">
                              Schedule Date:{" "}
                              <span className="">
                                {new Date(item.date).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </span>
                            </p>
                            <p className="text-[#4F4F4F] my-2">
                              Message: <span className="">{item.message}</span>
                            </p>
                            <div className="flex items-end justify-between gap-3">
                              <div>
                                <button
                                  className="bg-white border border-gray-300 font-semibold text-gray-700 py-1 px-4 rounded-lg me-3"
                                  onClick={() => {
                                    navigate(
                                      user.role ? "" : "/admin/facility"
                                    );
                                    close();
                                  }}
                                >
                                  View
                                </button>

                                <button
                                  type="submit"
                                  onClick={() =>
                                    handleClearSingleNotification(item._id)
                                  }
                                  className={`py-1 px-4 rounded-lg ${"bg-[#5678E9] font-semibold text-white"}`}
                                >
                                  Ignore
                                </button>
                              </div>
                              <p className="text-sm text-[#A7A7A7]">
                                {format(item.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <img src="/assets/no-notification.png" alt="" />
                        <h3 className="text-center text-[#4F4F4F] font-[20px]">
                          No notification yet!
                        </h3>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
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
