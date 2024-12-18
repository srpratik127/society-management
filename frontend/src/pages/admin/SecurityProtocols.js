import React, { useEffect, useState } from "react";
import CreateProtocol from "../../components/models/CreateProtocol";
import EditProtocol from "../../components/models/EditProtocol";
import ViewProtocol from "../../components/models/ViewProtocol";
import axios from "axios";
import DeleteModel from "../../components/models/DeleteModel";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const SecurityProtocols = () => {
  const [protocols, setProtocols] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchProtocols = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/protocol`
        );
        setProtocols(response?.data);
        setLoader(false);
      } catch (error) {
        toast.error(error.response?.data?.message);
        setLoader(false);
      }
    };

    fetchProtocols();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/protocol/${selectedProtocol._id}`
      );
      toast.success("Protocol Deleted successful!");

      setProtocols((prev) =>
        prev.filter((request) => request._id !== selectedProtocol._id)
      );
      setOpenDelete(false);
      setSelectedProtocol(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) {
      return "Invalid time";
    }
    let time;
    if (typeof timeString === "string" && !isNaN(Number(timeString))) {
      timeString = Number(timeString);
    }
    if (typeof timeString === "number") {
      if (timeString.toString().length === 10) {
        timeString *= 1000;
      }
      time = new Date(timeString);
    } else if (
      typeof timeString === "string" &&
      /^[0-9]{2}:[0-9]{2}$/.test(timeString)
    ) {
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
  return (
    <div className="p-6 bg-white m-6 rounded-lg shadow max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">
          Security Protocols
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg w-full md:w-auto"
        >
          Create Protocol
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg min-w-[750px]">
          <thead className="bg-[#d0d9f7] text-black">
            <tr>
              <th className="py-2 px-4 font-semibold text-left text-gray-600">
                Title
              </th>
              <th className="py-2 px-4 font-semibold text-gray-600 text-left">
                Description
              </th>
              <th className="py-2 px-4 font-semibold text-gray-600 text-center">
                Date
              </th>
              <th className="py-2 px-4 font-semibold text-gray-600 text-center">
                Time
              </th>
              <th className="py-2 px-4 font-semibold text-gray-600 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loader ? (
              <tr className="text-gray-500 select-none">
                <td className="text-center py-4 leading-[140px]" colSpan="100%">
                  <Loader />
                </td>
              </tr>
            ) : protocols.length > 0 ? (
              protocols.map((protocol) => (
                <tr key={protocol._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700 text-nowrap capitalize">
                    {protocol.title}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-nowrap">
                    {protocol.description}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center text-nowrap">
                    {new Date(protocol.date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center text-nowrap">
                    {formatTime(protocol.time)}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedProtocol(protocol);
                        setIsEditModalOpen(true);
                      }}
                      className="text-green-500 hover:text-green-700 h-10 w-10"
                    >
                      <img src="/assets/edit.svg" alt="Edit" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProtocol(protocol);
                        setIsViewModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 h-10 w-10"
                    >
                      <img src="/assets/blueeye.svg" alt="View" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProtocol(protocol);
                        setOpenDelete(true);
                      }}
                      className="text-red-500 hover:text-red-700 h-10 w-10"
                    >
                      <img src="/assets/delete.svg" alt="Delete" />
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
        <CreateProtocol
          onClose={() => setIsModalOpen(false)}
          setProtocols={setProtocols}
        />
      )}
      {isEditModalOpen && selectedProtocol && (
        <EditProtocol
          protocol={selectedProtocol}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProtocol(null);
          }}
          setProtocols={setProtocols}
        />
      )}
      {isViewModalOpen && selectedProtocol && (
        <ViewProtocol
          protocol={selectedProtocol}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedProtocol(null);
          }}
        />
      )}
      {openDelete && (
        <DeleteModel
          closePopup={() => {
            setOpenDelete(false);
            setSelectedProtocol(null);
          }}
          onDelete={handleDelete}
          message={{
            title: "Delete Protocol?",
            sms: "Are you sure you want to delate this Protocol?",
          }}
        />
      )}
    </div>
  );
};

export default SecurityProtocols;
