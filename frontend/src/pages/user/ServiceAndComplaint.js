import React, { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import CreateComplaintTracking from "../../components/models/CreateComplaintTracking";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteModel from "../../components/models/DeleteModel";
import AddEditRequestTracking from "../../components/models/AddEditRequestTracking";

const ServiceAndComplaint = () => {
  const userId = useSelector((store) => store.auth.user._id);
  const [activeTab, setActiveTab] = useState("complaints");

  const [addComplaintOpen, setAddComplaintOpen] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState({});
  const [openDeleteComplain, setOpenDeleteComplain] = useState(false);
  const [complainList, setComplainList] = useState([]);

  const [addRequestOpen, setAddRequestOpen] = useState(false);
  const [requestsList, setRequestsList] = useState([]);
  const [openDeleteRequest, setOpenDeleteRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/complaints/${userId}`
        );
        setComplainList(response?.data?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchComplainList();
  }, []);

  useEffect(() => {
    const fetchRequestsList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/requests/${userId}`
        );
        setRequestsList(response?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRequestsList();
  }, []);

  const handleDeleteComplain = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/complaints/${selectedComplain._id}`
      );
      setComplainList((prev) =>
        prev.filter((complain) => complain._id !== selectedComplain._id)
      );
      setOpenDeleteComplain(false);
      setSelectedComplain({});
      toast.success("Complaints Deleted successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDeleteRequest = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/requests/${selectedRequest._id}`
      );
      setRequestsList((prev) =>
        prev.filter((request) => request._id !== selectedRequest._id)
      );
      setOpenDeleteRequest(false);
      setSelectedRequest({});
      toast.success("Requests Deleted successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-6">
      <div className="flex">
        <button
          className={`py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg border-b focus:outline-none ${
            activeTab === "complaints"
              ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setActiveTab("complaints")}
        >
          Complaint Submission
        </button>
        <button
          className={`py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg border-b focus:outline-none ${
            activeTab === "requests"
              ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Request Submission
        </button>
      </div>

      {activeTab === "complaints" && (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-xl font-semibold mb-4">Complaint</h2>
            </div>
            <div className="bg-gradient-to-r from-[#FE512E] to-[#F09619] rounded-lg px-3 py-2 text-white font-semibold">
              <button onClick={() => setAddComplaintOpen(true)}>
                Create Complaint
              </button>
            </div>
          </div>
          {complainList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {complainList.map((complaint) => (
                <div className="bg-white shadow rounded-lg" key={complaint._id}>
                  <div className="flex justify-between rounded-t-lg items-center mb-2 px-3 py-2 bg-[#5678E9]">
                    <h3 className="font-semibold text-base text-white capitalize">
                      {complaint.complaintName}
                    </h3>
                    <Popover className="relative">
                      <Popover.Button className="outline-none">
                        <img src="/assets/3dots.svg" alt="options" />
                      </Popover.Button>
                      <Popover.Panel className="absolute right-0 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-2">
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              setSelectedComplain(complaint);
                              setOpenDeleteComplain(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>
                  <div className="text-sm p-3 text-gray-500 flex justify-between">
                    <div className="text-[#4F4F4F]">Request Date:</div>
                    <span className="text-black font-semibold ">
                      {new Date(complaint.updatedAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="text-sm px-3 text-gray-500 flex justify-between items-center">
                    <div className="text-[#4F4F4F]">Status:</div>
                    <div
                      className={`px-2 py-1 rounded-full ${
                        complaint.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : complaint.status === "Resolved" ||
                            complaint.status === "Solve"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {complaint.status}
                    </div>
                  </div>
                  <div className="text-sm px-3 text-gray-500 mt-2 mb-3">
                    <div className="text-[#4F4F4F]">Description:</div>
                    <span className="text-black font-semibold">
                      {complaint.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No complaints to display at the moment.
            </p>
          )}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-xl font-semibold mb-4">Request</h2>
            </div>
            <div className="bg-gradient-to-r from-[#FE512E] to-[#F09619] rounded-lg px-3 py-2 text-white font-semibold">
              <button onClick={() => setAddRequestOpen(true)}>
                Create Request
              </button>
            </div>
          </div>
          {requestsList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {requestsList.map((requests) => (
                <div className="bg-white shadow rounded-lg" key={requests._id}>
                  <div className="flex justify-between rounded-t-lg items-center mb-2 px-3 py-2 bg-[#5678E9]">
                    <h3 className="font-semibold text-base text-white">
                      {requests.requestName}
                    </h3>
                    <Popover className="relative">
                      <Popover.Button className="outline-none">
                        <img src="/assets/3dots.svg" alt="options" />
                      </Popover.Button>
                      <Popover.Panel className="absolute right-0 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-2">
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              setSelectedRequest(requests);
                              setOpenDeleteRequest(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>
                  <div className="text-sm px-3 text-gray-500 flex justify-between">
                    <div className="text-[#4F4F4F]">Request Date:</div>
                    <span className="font-semibold text-black">
                      {new Date(requests.updatedAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="text-sm px-3 mt-2 text-gray-500 flex justify-between items-center">
                    <div className="text-[#4F4F4F]">Status:</div>
                    <div
                      className={`px-2 py-1 rounded-full ${
                        requests.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : requests.status === "Resolved" ||
                            requests.status === "Solve"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {requests.status}
                    </div>
                  </div>
                  <div className="text-sm px-3 flex justify-between  text-gray-500 mt-2 mb-3">
                    <div className="text-[#4F4F4F]">Priority:</div>
                    <span className="text-black font-semibold">
                      {requests.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No requests to display at the moment.
            </p>
          )}
        </div>
      )}

      {addComplaintOpen && (
        <CreateComplaintTracking
          onClose={() => setAddComplaintOpen(false)}
          setComplaints={setComplainList}
        />
      )}

      {(openDeleteComplain || openDeleteRequest) && (
        <DeleteModel
          closePopup={() => {
            setOpenDeleteComplain(false);
            setOpenDeleteRequest(false);
          }}
          onDelete={
            openDeleteComplain ? handleDeleteComplain : handleDeleteRequest
          }
          message={{
            title: `Delete ${openDeleteComplain ? "Complain" : "Request"}?`,
            sms: `Are you sure you want to delate this ${
              openDeleteComplain ? "Complain" : "Request"
            } ?`,
          }}
        />
      )}

      {addRequestOpen && (
        <AddEditRequestTracking
          onClose={() => setAddRequestOpen(false)}
          setRequestProtocols={setRequestsList}
        />
      )}
    </div>
  );
};

export default ServiceAndComplaint;
