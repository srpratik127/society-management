import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CreateComplaintTracking = ({ onClose, setComplaints }) => {
  const user = useSelector((store) => store.auth.user);
  const [complainerName, setComplainerName] = useState("");
  const [complaintName, setComplaintName] = useState("");
  const [description, setDescription] = useState("");
  const [wing, setWing] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!complainerName)
      newErrors.complainerName = "Complainer name is required";
    if (!complaintName) newErrors.complaintName = "Complaint name is required";
    if (!description) newErrors.description = "Description is required";
    if (!wing) newErrors.wing = "Wing is required";
    if (!unit) newErrors.unit = "Unit is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/complaints`,
        {
          complaintName,
          complainerName,
          description,
          wing,
          unit,
          priority,
          userId: user._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Complaints Create successful!");
        setComplaints((prevComplaints) => [
          ...prevComplaints,
          response.data.data,
        ]);
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold pb-3 mb-4 border-b">
          Create Complaint
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Complainer Name*
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className={`w-full border p-2 rounded-lg outline-none ${
                errors.complainerName ? "border-red-500" : "border-gray-300"
              }`}
              value={complainerName}
              onChange={(e) => setComplainerName(e.target.value)}
            />
            {errors.complainerName && (
              <p className="text-red-500 text-sm">{errors.complainerName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Complaint Name*
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className={`w-full border p-2 rounded-lg outline-none ${
                errors.complaintName ? "border-red-500" : "border-gray-300"
              }`}
              value={complaintName}
              onChange={(e) => setComplaintName(e.target.value)}
            />
            {errors.complaintName && (
              <p className="text-red-500 text-sm">{errors.complaintName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Description*
            </label>
            <textarea
              placeholder="Enter Description"
              className={`w-full border p-2 rounded-lg outline-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block font-medium text-gray-700">Wing*</label>
              <input
                type="text"
                placeholder="Enter Wing"
                className={`w-full border p-2 rounded-lg outline-none ${
                  errors.wing ? "border-red-500" : "border-gray-300"
                }`}
                value={wing}
                onChange={(e) => setWing(e.target.value)}
              />
              {errors.wing && (
                <p className="text-red-500 text-sm">{errors.wing}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Unit*</label>
              <input
                type="text"
                placeholder="Enter Unit"
                className={`w-full border p-2 rounded-lg outline-none ${
                  errors.unit ? "border-red-500" : "border-gray-300"
                }`}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit}</p>
              )}
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
                      ? "border-[#FE512E]"
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#D3D3D3] w-full text-[#202224] font-semibold py-2 px-4 rounded-md mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full font-semibold py-2 px-4 rounded-md bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white `}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaintTracking;
