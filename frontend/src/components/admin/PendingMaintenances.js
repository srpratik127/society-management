import axios from "axios";
import React, { useEffect, useState } from "react";

const PendingMaintenances = () => {
  const [pendingMaintenance, setPendingMaintenance] = useState([]);

  useEffect(() => {
    const fetchPendingMaintenance = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/maintenance?status=pending`
        );
        setPendingMaintenance(response?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPendingMaintenance();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-xl font-semibold bg-white pb-1">
        <h2 className="m-0">Pending Maintenances</h2>
        <button className="flex items-center space-x-2 px-3 rounded-md text-[#5678E9] text-lg">
          <span>View all</span>
        </button>
      </div>
      <div className="max-h-[350px] overflow-y-auto bg-white rounded-lg mt-2">
        {pendingMaintenance?.length > 0 ? (
          pendingMaintenance.map((PendingMainten) => (
            <div
              key={PendingMainten._id}
              className="flex justify-between items-center px-4 py-2 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={PendingMainten.user?.profile_picture}
                  alt={PendingMainten.user?.fullName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="space-y-1">
                  <span className="block font-medium">
                    {PendingMainten.user?.fullName}
                  </span>
                  <span className="block text-gray-500 text-sm">
                    {PendingMainten.penaltyDay}
                  </span>
                </div>
              </div>
              <div className="text-red-500 font-semibold text-lg">
                ₹ {PendingMainten.amount}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center leading-[350px] select-none">
            No Data found.
          </p>
        )}
      </div>
    </>
  );
};

export default PendingMaintenances;
