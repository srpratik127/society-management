import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddVisitorDetails from "../../components/models/AddVisitorDetails";

const VisitorLogs = ({ isAddable }) => {
  const [visitorData, setVisitorData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/visitors`
        );
        setVisitorData(response?.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchComplainList();
  }, []);

  return (
    <div className="bg-white rounded-lg px-4 pt-2 m-6 shadow">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Visitor Logs</h1>
        <div className="flex gap-3">
          <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
          {isAddable && (
            <button
              className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="pr-2">
                <img src="/assets/add-square.svg" alt="Add" />
              </span>
              Add Visitor Details
            </button>
          )}
        </div>
      </div>

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
                    {securityManagement.phoneNumber}
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
      {isModalOpen && (
        <AddVisitorDetails
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          setVisitorData={setVisitorData}
        />
      )}
    </div>
  );
};

export default VisitorLogs;
