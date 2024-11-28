import React, { useEffect, useState } from "react";
import CreateComplaintTracking from "../../components/models/CreateComplaintTracking";
import axios from "axios";
import ViewComplain from "../../components/models/ViewComplain";
import EditComplaint from "../../components/models/EditComplaint";
import DeleteModel from "../../components/models/DeleteModel";
import toast from "react-hot-toast";

const CreateComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState({});
  const [isComplaintCreate, setIsComplaintCreate] = useState(false);
  const [openViewComplain, setOpenViewComplain] = useState(false);
  const [openEditComplain, setOpenEditComplain] = useState(false);
  const [openDeleteComplain, setOpenDeleteComplain] = useState(false);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/complaints`
        );
        setComplaints(response?.data?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchComplainList();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/complaints/${selectedComplain._id}`
      );
      setComplaints((prev) =>
        prev.filter((complain) => complain._id !== selectedComplain._id)
      );
      setOpenDeleteComplain(false);
      toast.success("Complaints Deleted successful!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 m-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Complaint
        </h2>
        <button
          onClick={() => setIsComplaintCreate(true)}
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
        >
          Create Complaint
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#d0d9f7] text-black">
            <tr>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-start">
                Complainer Name
              </th>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-center">
                Complaint Name
              </th>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-center">
                Description
              </th>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-center">
                Unit Number
              </th>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-center">
                Priority
              </th>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-center">
                Status
              </th>
              <th className="py-2 px-4 text-nowrap text-gray-600 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((entry, index) => (
                <tr key={index} className="border-b border-gray-200 capitalize">
                  <td className="py-3 px-4 text-gray-700 flex text-nowrap gap-3 items-center mr-6">
                    <img
                      src={entry.user?.profile_picture}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    {entry.complainerName}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center text-nowrap">
                    {entry.complaintName}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center text-nowrap">
                    {entry.description}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center text-nowrap">
                    <span className="px-2 text-[#5678E9] bg-[#F6F8FB] rounded-full">
                      {entry.wing}
                    </span>
                    {entry.unit}
                  </td>
                  <td className="py-3 px-4 text-center w-20">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm block ${
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
                  <td className="py-3 px-4 text-center w-24">
                    <span
                      className={`w-20 px-3 py-1 rounded-full text-sm text-gray-800 text-center block ${
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
                  <td className="py-3 px-4 flex space-x-3 justify-center">
                    <button
                      className="text-green-500 hover:text-green-700 h-10 w-10"
                      onClick={() => {
                        setOpenEditComplain(true);
                        setSelectedComplain(entry);
                      }}
                    >
                      <img src="/assets/edit.svg" alt="Edit" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 h-10 w-10"
                      onClick={() => {
                        setOpenViewComplain(true);
                        setSelectedComplain(entry);
                      }}
                    >
                      <img src="/assets/blueeye.svg" alt="View" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 h-10 w-10"
                      onClick={() => {
                        setOpenDeleteComplain(true);
                        setSelectedComplain(entry);
                      }}
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
      {isComplaintCreate && (
        <CreateComplaintTracking
          onClose={() => setIsComplaintCreate(false)}
          setComplaints={setComplaints}
        />
      )}
      {openViewComplain && (
        <ViewComplain
          closePopup={() => setOpenViewComplain(false)}
          selectedComplain={selectedComplain}
        />
      )}
      {openEditComplain && (
        <EditComplaint
          closePopup={() => setOpenEditComplain(false)}
          selectedComplain={selectedComplain}
          setComplainList={setComplaints}
        />
      )}
      {openDeleteComplain && (
        <DeleteModel
          closePopup={() => setOpenDeleteComplain(false)}
          onDelete={handleDelete}
          message={{
            title: "Delete Complain?",
            sms: "Are you sure you want to delate this complain?",
          }}
        />
      )}
    </div>
  );
};
export default CreateComplaint;
