import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import Loader from "../Loader";

const AddVisitorDetails = ({ isOpen, closeModal, setVisitorData }) => {
  const initialVisitorState = {
    name: "",
    wing: "",
    unit: "",
    phoneNumber: "",
    date: "",
    time: "",
  };

  const [newVisitor, setNewVisitor] = useState(initialVisitorState);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const isFormValid = Object.values(newVisitor).every(Boolean);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setNewVisitor(initialVisitorState);
      setErrors({});
      setDate(null); 

    }
  }, [isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      const [hours, minutes] = value.split(":");
      const date = new Date();
      date.setHours(hours, minutes);
      const formattedTime = date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setNewVisitor({
        ...newVisitor,
        time: formattedTime,
      });
    } else {
      setNewVisitor({ ...newVisitor, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newVisitor.name) newErrors.name = "Visitor name is required";
    if (!newVisitor.wing) newErrors.wing = "Wing is required";
    if (!newVisitor.unit) newErrors.unit = "Unit is required";
    if (!newVisitor.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!newVisitor.date) newErrors.date = "Date is required";
    if (!newVisitor.time) newErrors.time = "Time is required";

    if (newVisitor.phoneNumber && !/^\d{10}$/.test(newVisitor.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/visitors`,
        newVisitor
      );

      if (response.status === 200) {
        closeModal();
        setVisitorData((prev) => [...prev, response.data.data]);
        setLoader(false);
        toast.success("Visitor added successfully");
      } else {
        toast.error("Failed to add visitor");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      setLoader(false);
    }
  };
  return (
    <div
      className={`${
        isOpen
          ? "fixed inset-0 flex items-center justify-center z-50"
          : "hidden"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative z-50">
        <h2 className="text-xl font-semibold mb-4">Add Visitor Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block outline-none text-gray-700">
              Visitor Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={newVisitor.name}
              onChange={handleChange}
              className={`w-full p-2 border outline-none border-gray-300 rounded ${
                errors.name && "border-red-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block outline-none text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              maxLength="10"
              placeholder="Enter Phone Number"
              value={newVisitor.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 border outline-none border-gray-300 rounded ${
                errors.phoneNumber && "border-red-500"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">
                Wing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="wing"
                placeholder="Enter Wing"
                value={newVisitor.wing}
                onChange={handleChange}
                className={`w-full p-2 border outline-none border-gray-300 rounded ${
                  errors.wing && "border-red-500"
                }`}
              />
              {errors.wing && (
                <p className="text-red-500 text-sm">{errors.wing}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="unit"
                placeholder="Enter Unit"
                value={newVisitor.unit}
                onChange={handleChange}
                className={`w-full p-2 border outline-none border-gray-300 rounded ${
                  errors.unit && "border-red-500"
                }`}
              />
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit}</p>
              )}
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="text-sm font-medium">
                Date<span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={date}
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                placeholderText="Select Date"
                onChange={(selectedDate) => {
                  setDate(selectedDate);
                  setNewVisitor((prev) => ({
                    ...prev,
                    date: selectedDate ? selectedDate.toLocaleDateString() : "",
                  }));
                }}
                className="w-full p-2 border rounded-md outline-none"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">
                Time<span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={newVisitor.time ? newVisitor.time.split(" ")[0] : ""}
                onChange={handleChange}
                className={`w-full p-2 border outline-none border-gray-300 rounded ${
                  errors.time && "border-red-500"
                }`}
              />
              {newVisitor.time && (
                <span className="text-gray-500 text-sm">{newVisitor.time}</span>
              )}
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="w-1/2 border outline-none text-gray-700 rounded-lg py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loader}
              className={`w-1/2 ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                  : "bg-gray-100 text-gray-500"
              } rounded-lg py-2`}
            >
              Save
              {!loader ? "Save" : <Loader />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisitorDetails;
