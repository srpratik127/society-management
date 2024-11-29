import axios from "axios";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const EditSecurity = ({ isOpen, onClose, guardData, setGuards }) => {
  const [fullName, setFullName] = useState(guardData.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(guardData.phone || "");
  const [gender, setGender] = useState(guardData.gender || "");
  const [shift, setShift] = useState(guardData.shift || "");
  const [shiftDate, setShiftDate] = useState(new Date(guardData.shiftDate) || new Date());
  const [shiftTime, setShiftTime] = useState(guardData.shiftTime || "");
  const [profilePhoto, setProfilePhoto] = useState(guardData.profile_photo || null);
  const profileInputRef = useRef(null);

  const handleProfileUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phone", phoneNumber);
    formData.append("gender", gender);
    formData.append("shift", shift);
    formData.append("shiftDate", shiftDate.toISOString());
    formData.append("shiftTime", shiftTime);

    if (profilePhoto instanceof File) {
      formData.append("profile_photo", profilePhoto);
    }

    try {
      const response = await axios.put(`http://localhost:5000/v1/api/guard/${guardData._id}`, formData);
      if (response.status === 200) {
        const updatedGuard = response.data.data;
        setGuards((prevGuards) =>
          prevGuards.map((guard) =>
            guard._id === updatedGuard._id ? updatedGuard : guard
          )
        );
        toast.success("Guard Update successful!");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Security</h2>
        <div className="flex justify-start mb-4">
          <img
            className="w-16 h-16 rounded-full"
            src={
              profilePhoto instanceof File
                ? URL.createObjectURL(profilePhoto)
                : profilePhoto || guardData.profile_picture
            }
            alt="User"
          />
          <button
            className="text-blue-500 ml-4"
            onClick={() => profileInputRef.current.click()}
          >
            {profilePhoto ? "Change Photo" : "Add Photo"}
          </button>
          <input
            type="file"
            ref={profileInputRef}
            className="hidden"
            onChange={handleProfileUpload}
            accept=".png,.jpeg,.jpg,"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Full Name*</label>
          <input
            type="text"
            className="w-full border p-2 rounded radius-[10px]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Phone Number*</label>
          <input
            type="tel"
            maxLength="10"
            className="w-full border p-2 rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-[175px]">
            <label className="block text-gray-700">Gender*</label>
            <select
              className="w-full border p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Shift*</label>
            <select
              className="w-full border p-2 rounded"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="">Select Shift</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Shift Date*</label>
            <DatePicker
              selected={shiftDate}
              onChange={(date) => setShiftDate(date)}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className="block w-full border rounded-lg p-2 outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Shift Time*</label>
            <input
              type="time"
              className="w-full border p-2 rounded"
              value={shiftTime}
              onChange={(e) => setShiftTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-white border w-full border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 w-full bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSecurity;
