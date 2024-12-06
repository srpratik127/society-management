import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EventsParticipation = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [eventsParticipation, setEventsParticipation] = useState([]);
  const [filteredParticipation, setFilteredParticipation] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/announcement`
        );
        setEventsParticipation(response?.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch data.");
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (activeTab === "events") {
        setFilteredParticipation(
          eventsParticipation.filter((item) => item.type === "Event")
        );
      } else if (activeTab === "activity") {
        setFilteredParticipation(
          eventsParticipation.filter((item) => item.type === "Activity")
        );
      }
    };
    filterData();
  }, [activeTab, eventsParticipation]);

  return (
    <div>
      <div className="flex border-b m-6 mb-0">
        <button
          className={`px-4 py-3 font-semibold rounded-t-md border-b-2 border-orange-500 ${
            activeTab === "events"
              ? "text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
              : "text-gray-600 bg-white"
          }`}
          onClick={() => setActiveTab("events")}
        >
          Events Participate
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-md border-b-2 border-orange-500 ${
            activeTab === "activity"
              ? "text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
              : "text-gray-600 bg-white"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          Activity Participate
        </button>
      </div>

      <div className="p-4 m-6 mt-0 bg-gray-50 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {activeTab === "events" ? "Events" : "Activities"} Participation
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-600">
                <th className="px-4 py-2 text-nowrap font-semibold rounded-tl-lg">
                  Participator Name
                </th>
                <th className="px-4 py-2 font-semibold">Description</th>
                <th className="px-4 py-2 text-center text-nowrap font-semibold">
                  Event Time
                </th>
                <th className="px-4 py-2 text-nowrap font-semibold">
                  Event Date
                </th>
                <th className="px-4 py-2 text-nowrap font-semibold rounded-tr-lg">
                  Event Name
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipation.length > 0 ? (
                filteredParticipation.map((participant) =>
                  participant.members.map((member, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-2 flex items-center space-x-3">
                        <img
                          src={member.user?.profile_picture}
                          alt={member.user?.fullName}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                        />
                        <span className="font-medium capitalize">
                          {member.user?.fullName}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-600 max-w-80 min-w-96">
                        {participant.description}
                      </td>
                      <td className="px-4 py-2 text-center rounded-full text-nowrap">
                        {participant.time}
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {new Date(participant.date).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2 text-gray-600 text-nowrap">
                        {participant.title}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr className="text-gray-400 select-none">
                  <td
                    className="text-center py-4 leading-[149px]"
                    colSpan="100%"
                  >
                    No {activeTab === "events" ? "Events" : "Activities"}{" "}
                    Participation Members Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsParticipation;
