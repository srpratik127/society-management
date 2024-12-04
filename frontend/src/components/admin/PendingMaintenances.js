import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
const PendingMaintenances = () => {
  const [pendingMaintenance, setPendingMaintenance] = useState([]);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchPendingMaintenance = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/pending`
        );
        setPendingMaintenance(response?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchPendingMaintenance();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center font-semibold bg-white pb-1 ">
        <h2 className="m-0 text-xl">Pending Maintenances</h2>
        <Link
          to={user?.user_role === "admin" ? "income" : ""}
          className="flex items-center space-x-2 px-3 rounded-md text-[#5678E9]"
        >
          <span className="text-nowrap">View all</span>
        </Link>
      </div>
      <div className="max-h-[350px] overflow-y-auto bg-white rounded-lg mt-2 pr-4">
        {pendingMaintenance.length > 0 ? (
          pendingMaintenance.map((member) => (
            <div
              key={member._id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.user?.profile_picture}
                  alt={member.user?.fullName || "User"}
                  className="w-12 h-12 rounded-full"
                />
                <div className="space-y-1">
                  <span className="block font-medium capitalize">
                    {member.user?.fullName || "Unknown User"}
                  </span>
                  <span className="block text-gray-500 text-sm">
                    {new Date(member.penaltyDay).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="text-red-500 font-semibold text-lg text-nowrap">
                ₹ {member.amount}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center leading-[350px] select-none">
            No Data Found.
          </p>
        )}
      </div>
    </>
  );
};

export default PendingMaintenances;
