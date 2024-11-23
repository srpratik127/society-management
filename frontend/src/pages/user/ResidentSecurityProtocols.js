import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResidentSecurityProtocols = () => {
  const [protocols, setProtocols] = useState([]);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/api/protocol`);
        setProtocols(response.data);
      } catch (error) {
        toast.error("Failed to load security protocols");
      }
    };
    fetchProtocols();
  }, []);

  const formatTime = (timeString) => {
    if (!timeString) {
      return "Invalid time";
    }
    let time;
    if (typeof timeString === "string" && !isNaN(new Date(timeString))) {
      time = new Date(timeString);
    } else if (typeof timeString === "number") {
      time = new Date(timeString);
    } else if (typeof timeString === "string" && /^[0-9]{2}:[0-9]{2}$/.test(timeString)) {
      const [hours, minutes] = timeString.split(":");
      time = new Date();
      time.setHours(hours, minutes, 0, 0);
    } else {
      return "Invalid time";
    }
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="p-4 m-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Security Protocols</h2>
      {/* Ensure table remains scrollable on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left text-nowrap">Title</th>
              <th className="py-3 px-6 text-left text-nowrap">Description</th>
              <th className="py-3 px-6 text-center text-nowrap"> Date</th>
              <th className="py-3 px-6 text-center text-nowrap">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
          {protocols.length > 0 ? (
              protocols.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left text-nowrap">{item.title}</td>
                <td className="py-3 px-6 text-left text-nowrap">{item.description}</td>
                <td className="py-3 px-6 text-center text-nowrap">{formatDate(item.date)}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="bg-[#F6F8FB] py-2 px-4 rounded-full inline-block text-nowrap">
                  {formatTime(item.time)}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-gray-500">
                <td colSpan="4" className="text-center py-4">
                  No security protocols found.
                </td>
              </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentSecurityProtocols;
