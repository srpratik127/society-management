import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const Emergency = () => {
  const [alertType, setAlertType] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((store) => store.auth.user); // Get the logged-in guard user from Redux

  const alertOptions = [
    "Emergency", "Warning", "Fire Alarm", "Earthquake", "High Winds", "Thunder"
  ];

  const handleSubmit = async (e) => {  
    e.preventDefault();

    if (!alertType || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      // Call POST API to create an emergency alert
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/api/create-alert`, {
        alertType,
        description,
        createdBy: user?._id, // Use the logged-in guard's ID
      });

      // Show success notification
      toast.success(`Alert "${alertType}" submitted successfully!`);

      // Clear the form fields after successful submission
      setAlertType("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to create alert");
      console.error("Error creating alert: ", error);
    }
  };

  const isSubmitDisabled = !alertType || !description;

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-lg mx-auto mt-[200px]">
      <h1 className="text-2xl font-bold mb-6">Alert</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Alert Type<span className="text-red-500">*</span>
          </label>
          <select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
            className="block w-full bg-white border border-gray-300 px-4 py-2 rounded-md"
            required
          >
            <option value="" disabled>Select Alert</option>
            {alertOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full bg-white border outline-none border-gray-300 px-4 py-2 rounded-md"
            rows="2"
            placeholder="Enter alert description"
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${isSubmitDisabled ? 'bg-gray-100 text-black' : 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white'}`}
            disabled={isSubmitDisabled}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Emergency;
