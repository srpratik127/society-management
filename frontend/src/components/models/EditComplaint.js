import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EditComplaint = ({ closePopup, selectedComplain, setComplainList }) => {
  const [complainerName, setComplainerName] = useState(
    selectedComplain.complainerName
  );
  const [complaintName, setComplaintName] = useState(
    selectedComplain.complaintName
  );
  const [description, setDescription] = useState(selectedComplain.description);
  const [wing, setWing] = useState(selectedComplain.wing);
  const [unit, setUnit] = useState(selectedComplain.unit);
  const [priority, setPriority] = useState(selectedComplain.priority);
  const [status, setStatus] = useState(selectedComplain.status);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/api/complaints/${selectedComplain._id}`,
        {
          complainerName,
          complaintName,
          description,
          wing,
          unit,
          priority,
          status,
        },
        {
          withCredentials: true,
        }
      );
      setComplainList((prev) =>
        prev.map((complaint) =>
          complaint._id === selectedComplain._id
            ? response.data.data
            : complaint
        )
      );
      toast.success("complaints Update successful!");
      closePopup();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
        <h2 className="text-xl font-semibold pb-4 mb-4 border-b">
          Edit Complaint
        </h2>
        <div className="mb-4">
          <label
            htmlFor="complainerName"
            className="block text-sm font-medium text-[#202224]"
          >
            Complainer Name
          </label>
          <input
            type="text"
            id="complainerName"
            value={complainerName}
            onChange={(e) => setComplainerName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="complaintName"
            className="block text-sm font-medium text-[#202224]"
          >
            Complaint Name
          </label>
          <input
            type="text"
            id="complaintName"
            value={complaintName}
            onChange={(e) => setComplaintName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#202224]"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300   
 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <div className="mb-4">
            <label
              htmlFor="wing"
              className="block text-sm font-medium text-[#202224]"
            >
              Wing
            </label>
            <input
              type="text"
              id="wing"
              value={wing}
              onChange={(e) => setWing(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-[#202224]"
            >
              Unit
            </label>
            <input
              type="text"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#202224]">
            Priority
          </label>
          <div className="mt-1 flex space-x-4">
            {["High", "Medium", "Low"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`px-4 py-2 flex gap-2 border rounded-lg font-medium ${
                  priority === level
                    ? "border-[#FE512E]"
                    : "border-gray-200 text-[#A7A7A7]"
                }`}
              >
                <img
                  src={`${
                    priority === level
                      ? "/assets/fill-redio.svg"
                      : "/assets/unfill-redio.svg"
                  }`}
                  alt=""
                />
                {level}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#202224]">
            Status
          </label>
          <div className="mt-1 flex space-x-4">
            {["Open", "Pending", "Solve"].map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setStatus(state)}
                className={`px-4 py-2 flex gap-2 border rounded-lg font-medium ${
                  status === state
                    ? "border-[#FE512E] "
                    : "border-gray-200 text-[#A7A7A7]"
                }`}
              >
                <img
                  src={`${
                    status === state
                      ? "/assets/fill-redio.svg"
                      : "/assets/unfill-redio.svg"
                  }`}
                  alt=""
                />{" "}
                {state}
              </button>
            ))}
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={closePopup}
            className="border border-[#D3D3D3] w-full text-[#202224] font-semibold py-2 px-4 rounded-md mr-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`w-full font-semibold py-2 px-4 rounded-md bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white `}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComplaint;
