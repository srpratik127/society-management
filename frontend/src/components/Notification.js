import { Popover } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { initialNotification } from "../store/NotificationSlice";
import DetailPopup from "./models/DetailPopup";
import DetailsViewPopup from "./models/DetailsViewPopup";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const notification = useSelector((store) => store.notification.notification);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsViewPopup, setDetailsViewPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [incomePopupContent, setIncomePopupContent] = useState(null);
  const [membersOfIncomeDetails, setMembersOfIncomeDetails] = useState({
    members: "",
    totalAmount: "",
    perPersonAmount: "",
  });

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/notifications/${user?._id}`
        );
        dispatch(initialNotification(response.data));
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    fetchNotification();
  }, []);

  const handleClearSingleNotification = async (notificationId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/notifications/clear/${user._id}/${notificationId}`
      );
      const updatedNotifications = notification.filter(
        (item) => item._id !== notificationId
      );
      dispatch(initialNotification(updatedNotifications));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/notifications/${user._id}`
      );
      dispatch(initialNotification([]));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const AddMemberAnnouncement = async (announcementId, notification) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/api/announcement/${announcementId}/add-member`,
        { userId: user._id }
      );

      toast.success(response.data.message);
      handleClearSingleNotification(notification._id);

      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding member to announcement"
      );
    } finally {
      setLoading(false);
    }
  };

  const handelAcceptorRejectMaintenance = async (notification, status) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/update-status/${notification?.otherContent?.maintenanceId}`,
        {
          userId: notification?.otherContent?.userId,
          paymentMethod: "cash",
          status,
        }
      );
      toast.success(response.data.message);
      handleClearSingleNotification(notification._id);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error processing acceptance."
      );
    } finally {
      setLoading(false);
    }
  };

  const acceptorRejectOtherIncome = async (notification, status) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/v1/api/income/add-member/${notification?.otherContent?.incomeId}`,
      {
        userId: notification?.otherContent?.userId,
        paymentMethod: "cash",
        status,
        payAmount: notification?.otherContent?.payAmount,
      }
    );
    toast.success(response.data.message);
    handleClearSingleNotification(notification._id);
  };

  const HandelView = (title, item) => {
    if (user?.user_role === "resident") {
      //resident
      if (title.trim().includes("Income")) {
        setIncomePopupContent(item.otherContent);
        setIsDetailsOpen(true);
      } else if (title.includes("Maintenance")) {
        navigate("/resident/maintenance-invoices");
      } else if (title.includes("Announcement")) {
        AddMemberAnnouncement(item?.otherContent?.announcementId, item);
      }
    } else if (user?.user_role === "admin") {
      //admin
      if (title.trim().includes("Income") || title.includes("Maintenance")) {
        navigate("/admin/income");
      } else if (title.trim().includes("Facility")) {
        navigate("/admin/facility");
      }
    }
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="relative focus:outline-none p-2 border border-gray-200 rounded-xl hover:shadow-md">
          <img src="/assets/notification-bing.svg" alt="" />
          <span
            className={`absolute top-1 right-1 ${notification?.length > 0 ? "h-4 w-4" : "h-2 w-2"
              } bg-red-500 text-white rounded-full text-[10px]`}
          >
            {notification?.length > 0 && notification?.length}
          </span>
        </Popover.Button>

        <Popover.Panel className="absolute right-0 mt-2 w-[250px] sm:w-[484px] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
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
                        className="w-full flex flex-col sm:flex-row items-start gap-3 p-2 border-b mb-2"
                      >
                        <p className="w-12 h-12 bg-[#e74d3c81] text-[#E74C3C] rounded-full text-center text-xl leading-[3rem]">
                          {item.name?.charAt(0).toUpperCase()}
                        </p>
                        <div className="w-full">
                          <h2 className="text-lg font-semibold break-words">{item.title}</h2>
                          <p className="text-[#4F4F4F]">
                            Name: <span className="text-blue-500">{item.name}</span>
                          </p>
                          <p className="text-[#4F4F4F] my-2">
                            createdAt Date:{" "}
                            <span className="">
                              {new Date(item.date).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                          </p>
                          <p className="text-[#4F4F4F] my-2 break-words">
                            Message: <span>{item.message}</span>
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                            <div className="flex gap-2">
                              <button
                                className="bg-white border border-gray-300 font-semibold text-gray-700 py-1 px-4 rounded-lg"
                                onClick={() => {
                                  if (
                                    item.name ===
                                    "Maintenance Payment Notification"
                                  ) {
                                    handelAcceptorRejectMaintenance(
                                      item,
                                      "done"
                                    );
                                  } else if (
                                    item.name ===
                                    "Other Income Payment Notification"
                                  ) {
                                    acceptorRejectOtherIncome(item, "done");
                                  } else {
                                    HandelView(item.title, item);
                                    close();
                                  }
                                }}
                              >
                                {item.name ===
                                  "Maintenance Payment Notification" ||
                                item.name ===
                                  "Other Income Payment Notification"
                                  ? "Accept"
                                  : "View"}
                              </button>
                              <button
                                type="submit"
                                onClick={() => {
                                  if (
                                    item.name ===
                                    "Maintenance Payment Notification"
                                  ) {
                                    handelAcceptorRejectMaintenance(
                                      item,
                                      "rejected"
                                    );
                                  } else if (
                                    item.name ===
                                    "Other Income Payment Notification"
                                  ) {
                                    acceptorRejectOtherIncome(item, "rejected");
                                  } else {
                                    handleClearSingleNotification(item._id);
                                  }
                                }}
                                className={`py-1 px-4 rounded-lg ${"bg-[#5678E9] font-semibold text-white"}`}
                              >
                                {item.name ===
                                "Maintenance Payment Notification"
                                  ? "Reject"
                                  : "Decline"}
                              </button>
                            </div>
                            <p className="text-sm text-[#A7A7A7] sm:mt-0 mt-2">
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
        {isDetailsOpen && (
          <DetailPopup
            onClose={() => {
              setIsDetailsOpen(false);
            }}
            incomePopupContent={incomePopupContent}
            setDetailsViewPopup={setDetailsViewPopup}
            setMembersOfIncomeDetails={setMembersOfIncomeDetails}
          />
        )}
        {detailsViewPopup && (
          <DetailsViewPopup
            onClose={() => setDetailsViewPopup(false)}
            membersOfIncomeDetails={membersOfIncomeDetails}
          />
        )}
      </Popover>
    </>
  );
};

export default Notification;
