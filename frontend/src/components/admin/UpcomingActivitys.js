import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpcomingActivitys = () => {
  const [upcomingactivities, setUpcomingactivities] = useState([]);

  useEffect(() => {
    const fetchPendingMaintenance = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/announcement`
        );
        setUpcomingactivities(response?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPendingMaintenance();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="w-full rounded-lg bg-white shadow px-3">
      <div className="flex justify-between items-center p-2 pb-1 mb-1">
        <h1 className="text-xl font-semibold">Upcoming Activity</h1>
        <div className="relative">
          <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>
      </div>
      <div className="h-[225px] overflow-y-auto rounded-b-lg">
        {upcomingactivities?.length > 0 ? (
          upcomingactivities.map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-1 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full text-center text-xl leading-[3rem]"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {activity.title?.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <span className="block font-medium">{activity.title}</span>
                  <span className="block text-gray-500 text-sm">
                    {activity.time}
                  </span>
                </div>
              </div>
              <div className="text-gray-500 font-semibold text-sm">
                {new Date(activity.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 select-none text-center py-4 leading-[149px]">
            No Data found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingActivitys;
