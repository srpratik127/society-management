import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VisitorLogs = () => {
  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/visitors`
        );
        setVisitorData(response?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchComplainList();
  }, []);

  return (
    <div className="p-4 bg-white m-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Visitor Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-6 text-gray-700 text-nowrap">
                Visitor Name
              </th>
              <th className="py-3 px-6 text-gray-700 text-center text-nowrap">
                Phone Number
              </th>
              <th className="py-3 px-6 text-gray-700 text-center text-nowrap">
                Date
              </th>
              <th className="py-3 px-6 text-gray-700 text-center text-nowrap">
                Unit Number
              </th>
              <th className="py-3 px-6 text-gray-700 text-center text-nowrap">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {visitorData.length > 0 ? (
              visitorData.map((securityManagement, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-6 flex items-center text-center text-nowrap min-w-[200px]">
                    <img
                      src="/assets/empty.png"
                      alt="Visitor"
                      className="rounded-full mr-3"
                    />
                    <span>{securityManagement.name}</span>
                  </td>
                  <td className="py-3 px-6 text-center text-nowrap min-w-[200px]">
                    {securityManagement.number}
                  </td>
                  <td className="py-3 px-6 text-center text-nowrap min-w-[200px]">
                    {new Date(securityManagement.date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-6 text-center text-nowrap min-w-[200px]">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 capitalize">
                      {securityManagement.wing}
                    </span>
                    <span className="ml-2">{securityManagement.unit}</span>
                  </td>
                  <td className="py-3 px-6 text-center text-nowrap min-w-[200px]">
                    {securityManagement.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-gray-500 select-none">
                <td className="text-center py-4 leading-[67vh]" colSpan="100%">
                  No Data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorLogs;
