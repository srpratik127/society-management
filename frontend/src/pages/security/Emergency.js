import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const Emergency = () => {
  const [alertType, setAlertType] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const user = useSelector((store) => store.auth.user);

  const alertOptions = [
    "Emergency",
    "Warning",
    "Fire Alarm",
    "Earthquake",
    "High Winds",
    "Thunder",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alertType || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/alert`,
        {
          alertType,
          description,
          createdBy: user?._id,
        }
      );
    setLoader(false);
      toast.success(`Alert "${alertType}" submitted successfully!`);

      setAlertType("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to create alert");
      setLoader(false); 
    }
  };

  const isSubmitDisabled = !alertType || !description;

  return (
    <div className="flex justify-center items-center h-full bg-[#F0F5FB]">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl w-full mx-4">
        <h1 className="text-xl sm:text-3xl font-semibold mb-4 sm:mb-6">
          Alert
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Alert Type<span className="text-red-500">*</span>
            </label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="block w-full bg-white border border-gray-300 px-4 py-2 rounded-md text-sm sm:text-base"
              required
            >
              <option value="" disabled>
                Select Alert
              </option>
              {alertOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full bg-white border outline-none border-gray-300 px-4 py-2 rounded-md text-sm sm:text-base"
              rows="2"
              placeholder="Enter alert description"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-sm sm:text-base font-semibold ${
                isSubmitDisabled
                  ? "bg-gray-100 text-black cursor-not-allowed"
                  : "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
              }`}
              disabled={isSubmitDisabled || loader}
            >
              {!loader ? "Send" : <Loader />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Emergency;
