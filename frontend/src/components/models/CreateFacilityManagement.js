import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { AddNotification } from "../../store/NotificationSlice";
import toast from "react-hot-toast";

const CreateFacilityManagement = ({ onClose, setFacilities }) => {
  const [facilityName, setFacilityName] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [remindBefore, setRemindBefore] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name} is required`;
    }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!facilityName) formErrors.facilityName = "Facility name is required";
    if (!description) formErrors.description = "Description is required";
    if (!scheduleDate) formErrors.scheduleDate = "Schedule date is required";
    if (!remindBefore) formErrors.remindBefore = "Reminder is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const facilityData = {
      name: facilityName,
      description,
      serviceData: scheduleDate,
      remindBefore: parseInt(remindBefore.split("-")[0]),
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/facilities`,
        facilityData
      );
      setFacilities((pre) => [...pre, response.data?.data]);
      dispatch(AddNotification(response.data?.notification));
      toast.success("Facilities Create successful!");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleFieldChange = (setter, fieldName) => (e) => {
    const value = e.target.value;
    setter(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Create Facility</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Facility Name*</label>
            <input
              type="text"
              value={facilityName}
              onChange={handleFieldChange(setFacilityName, "facilityName")}
              className={`w-full border ${
                errors.facilityName ? "border-red-500" : "border-gray-300"
              } p-2 rounded-lg mt-1 outline-none`}
              placeholder="Enter Name"
            />
            {errors.facilityName && (
              <p className="text-red-500 text-sm">{errors.facilityName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Description*</label>
            <textarea
              value={description}
              onChange={handleFieldChange(setDescription, "description")}
              className={`w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } p-2 rounded-lg mt-1 outline-none`}
              placeholder="Enter Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Schedule Service Date*</label>
            <DatePicker
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className={`block w-full border rounded-lg p-2 outline-none ${
                errors.scheduleDate && "border-red-500"
              }`}
            />
            {errors.scheduleDate && (
              <p className="text-red-500 text-sm">{errors.scheduleDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Remind Before*</label>
            <select
              value={remindBefore}
              onChange={handleFieldChange(setRemindBefore, "remindBefore")}
              className={`w-full border outline-none ${
                errors.remindBefore ? "border-red-500" : "border-gray-300"
              } p-2 rounded-lg mt-1`}
            >
              <option value="" disabled>
                Select Reminder
              </option>
              <option value="1-day">1-day</option>
              <option value="2-day">2-day</option>
              <option value="3-day">3-day</option>
              <option value="4-day">4-day</option>
            </select>
            {errors.remindBefore && (
              <p className="text-red-500 text-sm">{errors.remindBefore}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border w-full border-gray-300 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-lg w-full ${
                facilityName && description && scheduleDate && remindBefore
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white"
                  : "border bg-gray-100"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFacilityManagement;
