import React, { useEffect, useState } from "react";
import ViewRequestTracking from "../../components/models/ViewRequestTracking";
import axios from "axios";
import AddEditRequestTracking from "../../components/models/AddEditRequestTracking";
import DeleteModel from "../../components/models/DeleteModel";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const RequestTracking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openDeleteComplain, setOpenDeleteComplain] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [requestProtocols, setRequestProtocols] = useState([]);

  useEffect(() => {
    const fetchRequestList = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/requests`
        );
        setRequestProtocols(response?.data);
        setLoader(false);
      } catch (error) {
        toast.error(error.response?.data?.message);
        setLoader(false);
      }
    };
    fetchRequestList();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/requests/${selectedRequest._id}`
      );
      setRequestProtocols((prev) =>
        prev.filter((request) => request._id !== selectedRequest._id)
      );
      setOpenDeleteComplain(false);
      toast.success("Requests Deleted successful!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white m-4 sm:m-6 rounded-lg shadow max-w-full">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Create Request
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedRequest(null);
          }}
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
        >
          Create Request
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden min-w-[640px]">
          <thead className="bg-[#d0d9f7] text-black">
            <tr>
              {[
                "Complainer Name",
                "Request Name",
                "Request Date",
                "Unit Number",
                "Priority",
                "Status",
                "Action",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className={`py-2 px-2 sm:px-4 text-nowrap font-semibold text-gray-600 ${
                    header !== "Complainer Name" ? "text-center" : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loader ? (
              <tr className="text-gray-500 select-none">
                <td className="text-center py-4 leading-[140px]" colSpan="100%">
                  <Loader />
                </td>
              </tr>
            ) : requestProtocols.length > 0 ? (
              requestProtocols?.map((entry, index) => (
                <tr key={index} className="border-b border-gray-200 ">
                  <td className="p-2 sm:px-4 text-gray-700 flex items-center text-nowrap mx-3 capitalize">
                    <img
                      src={entry?.user?.profile_picture}
                      className="w-6 h-6 sm:w-10 sm:h-10 mr-2 rounded-full"
                      alt="avatar"
                    />
                    {entry.requesterName}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-700 text-center text-nowrap">
                    {entry.requestName}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-700 text-center text-nowrap">
                    {new Date(entry.date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-700 text-center text-nowrap">
                    <span className="px-2 text-[#5678E9] bg-[#F6F8FB] rounded-full">
                      {entry.wing}
                    </span>
                    {entry.unit}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center text-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        entry.priority === "High"
                          ? "bg-red-500"
                          : entry.priority === "Medium"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {entry.priority}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center text-nowrap">
                    <span
                      className={`w-20 px-3 py-1 rounded-full text-sm text-gray-800 ${
                        entry.status === "Pending"
                          ? "bg-yellow-300"
                          : entry.status === "Open"
                          ? "bg-blue-200"
                          : "bg-green-200"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 flex space-x-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedRequest(entry);
                        setIsModalOpen(true);
                      }}
                      className="text-green-500 hover:text-green-700 h-8 w-8"
                    >
                      <img src="/assets/edit.svg" alt="edit" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRequest(entry);
                        setIsViewModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 h-8 w-8"
                    >
                      <img src="/assets/blueeye.svg" alt="view" />
                    </button>
                    <button
                      onClick={() => {
                        setOpenDeleteComplain(true);
                        setSelectedRequest(entry);
                      }}
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <img src="/assets/delete.svg" alt="delete" />
                    </button>
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
        <AddEditRequestTracking
          onClose={() => setIsModalOpen(false)}
          setRequestProtocols={setRequestProtocols}
          existingData={selectedRequest}
        />
      )}
      {isViewModalOpen && (
        <ViewRequestTracking
          complaint={selectedRequest}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedRequest(null);
          }}
        />
      )}
      {openDeleteComplain && (
        <DeleteModel
          closePopup={() => {
            setOpenDeleteComplain(false);
            setSelectedRequest(null);
          }}
          onDelete={handleDelete}
          message={{
            title: "Delete Request?",
            sms: "Are you sure you want to delete this Request?",
          }}
        />
      )}
    </div>
  );
};

export default RequestTracking;
