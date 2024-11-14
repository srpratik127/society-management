import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

const AddEditRequestTracking = ({
  onClose,
  setRequestProtocols,
  existingData,
}) => {
  const user = useSelector((store) => store.auth.user);
  const [complainerName, setComplainerName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [wing, setWing] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");
  const [requestName, setRequestName] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (existingData) {
      setComplainerName(existingData.requesterName);
      setRequestName(existingData.requestName);
      setRequestDate(existingData.date);
      setWing(existingData.wing);
      setUnit(existingData.unit);
      setPriority(existingData.priority);
      setStatus(existingData.status);
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!complainerName) errors.complainerName = "Complainer name is required";
    if (!requestName) errors.requestName = "Request name is required";
    if (!requestDate) errors.requestDate = "Request date is required";
    if (!wing) errors.wing = "Wing is required";
    if (!unit) errors.unit = "Unit is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const requestData = {
          requestName,
          requesterName: complainerName,
          date: requestDate,
          wing,
          unit,
          priority,
          status,
          userId: user._id,
        };

        let response;

        if (existingData) {
          response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/requests/${existingData._id}`,
            requestData
          );
        } else {
          response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/requests`,
            requestData
          );
        }
        if (response.data.success) {
          if (existingData) {
            setRequestProtocols((prev) =>
              prev.map((item) =>
                item._id === response.data.data._id ? response.data.data : item
              )
            );
          } else {
            setRequestProtocols((prev) => [...prev, response.data.data]);
          }
          onClose();
        }
      } catch (error) {
        console.error("Error creating request:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {existingData ? "Edit Request" : "Create Request"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-sm  text-gray-700">
              Requester Name*
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className={`w-full border p-2 rounded-lg outline-none ${
                formErrors.complainerName ? "border-red-500" : "border-gray-300"
              }`}
              value={complainerName}
              onChange={(e) => setComplainerName(e.target.value)}
            />
            {formErrors.complainerName && (
              <p className="text-red-500 text-sm">
                {formErrors.complainerName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Request Name*
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className={`w-full border p-2 rounded-lg outline-none ${
                formErrors.requestName ? "border-red-500" : "border-gray-300"
              }`}
              value={requestName}
              onChange={(e) => setRequestName(e.target.value)}
            />
            {formErrors.requestName && (
              <p className="text-red-500 text-sm">{formErrors.requestName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium text-sm text-gray-700">
              Request Date*
            </label>
            <DatePicker
              selected={requestDate}
              onChange={(date) => setRequestDate(date)}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className={`block w-full border rounded-lg p-2 outline-none ${
                formErrors.requestDate && "border-red-500"
              }`}
            />

            {formErrors.requestDate && (
              <p className="text-red-500 text-sm">{formErrors.requestDate}</p>
            )}
          </div>
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block font-medium text-sm  text-gray-700">
                Wing*
              </label>
              <input
                type="text"
                placeholder="Enter Wing"
                className={`w-full border p-2 rounded-lg outline-none ${
                  formErrors.wing ? "border-red-500" : "border-gray-300"
                }`}
                value={wing}
                onChange={(e) => setWing(e.target.value)}
              />
              {formErrors.wing && (
                <p className="text-red-500 text-sm">{formErrors.wing}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-sm  text-gray-700">
                Unit*
              </label>
              <input
                type="text"
                placeholder="Enter Unit"
                className={`w-full border p-2 rounded-lg outline-none ${
                  formErrors.unit ? "border-red-500" : "border-gray-300"
                }`}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              {formErrors.unit && (
                <p className="text-red-500 text-sm">{formErrors.unit}</p>
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
                  />
                  {state}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => onClose()}
              className="border border-[#D3D3D3] w-full text-[#202224] font-semibold py-2 px-4 rounded-md mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full font-semibold py-2 px-4 rounded-md bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
            >
              {existingData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRequestTracking;
