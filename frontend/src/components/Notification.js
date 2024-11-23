import { Popover } from "@headlessui/react";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { initialNotification } from "../store/NotificationSlice";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const notification = useSelector((store) => store.notification.notification);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/notifications/${user?._id}`
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

  const HandelView = (title) => {
    if (user.role) {
      //resident
      if (title.trim().includes("Income")) {
        // show popup
      } else if (title.includes("Maintenance")) {
        navigate("/resident/maintenance-invoices");
      }
    } else {
      //admin
      if (title.trim().includes("Income") || title.includes("Maintenance")) {
        navigate("/admin/income");
      } else if (title.trim().includes("Facility")) {
        navigate("/admin/facility");
      }
    }
  };

  return (
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
                  onClick={() => {
                    handleClearNotifications();
                    close();
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="py-2 max-h-[75vh] overflow-y-auto">
              <div className="p-4 flex flex-col items-center">
                {notification?.length > 0 ? (
                  notification.map((item) => (
                    <div
                      key={item._id}
                      className="w-full flex items-start gap-3 p-2 border-b mb-2"
                    >
                      <p className="w-12 h-12 bg-[#e74d3c81] text-[#E74C3C] rounded-full text-center text-xl leading-[3rem]">
                        {item.name?.charAt(0).toUpperCase()}
                      </p>
                      <div className="w-full">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
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
                                HandelView(item.title);
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
                              Decline
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
  );
};

export default Notification;
