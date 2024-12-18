import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { filterComplains } from "../../utils/validation";
import Loader from "../Loader";

const UpcomingActivitys = () => {
  const [eventsParticipation, setEventsParticipation] = useState([]);
  const [filteredComplainList, setFilteredComplainList] = useState([]);
  const [timeFilter, setTimeFilter] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/announcement`
        );
        const activityData = response.data.filter(
          (item) => item.type === "Activity"
        );
        setEventsParticipation(activityData);
        setFilteredComplainList(activityData);
        setLoader(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch data.");
        setLoader(false);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterComplains(
      timeFilter,
      eventsParticipation,
      setFilteredComplainList,
      "date"
    );
  }, [timeFilter]);

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
          <select
            className="bg-gray-100 border border-gray-300 rounded-md p-2 outline-none"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
      </div>
      <div className="h-[218px] overflow-y-auto rounded-b-lg">
        {loader ? (
          <Loader />
        ) : filteredComplainList?.length > 0 ? (
          filteredComplainList?.map((activity, index) => (
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
