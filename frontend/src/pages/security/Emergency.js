import React, { useState } from "react";
import toast from "react-hot-toast";

const Emergency = () => {
  const [alertType, setAlertType] = useState("");
  const [description, setDescription] = useState("");

  const alertOptions = [
    { value: "Emergency", label: "Emergency" },
    { value: "Warning", label: "Warning" },
    { value: "Fire Alarm", label: "Fire Alarm" },
    { value: "Earth Quack", label: "Earth Quack" },
    { value: "High Winds", label: "High Winds" },
    { value: "Thunder", label: "Thunder" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!alertType || !description) {
      toast.error("Please fill out all fields");
      return;
    }
    toast.success(`Alert Type "${alertType}" with description submitted successfully!`);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-[200px]">
      <h1 className="text-2xl font-bold mb-6">Alert</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Alert Type<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="block w-full appearance-none bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Alert Type
              </option>
              {alertOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full bg-white border outline-none border-gray-300 px-4 py-2 rounded-md text-gray-700"
            rows="4"
            placeholder="Enter alert description"
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Emergency;
