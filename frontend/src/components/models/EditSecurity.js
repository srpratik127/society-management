import React, { useState, useRef } from 'react';

const EditSecurity = ({ isOpen, onClose, guardData }) => {
  const [fullName, setFullName] = useState(guardData.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(guardData.phoneNumber || '');
  const [gender, setGender] = useState(guardData.gender || '');
  const [shift, setShift] = useState(guardData.shift || '');
  const [shiftDate, setShiftDate] = useState(guardData.shiftDate || '');
  const [shiftTime, setShiftTime] = useState(guardData.shiftTime || '');
  const [aadharCard, setAadharCard] = useState(guardData.aadharCard || null);
  const [profilePhoto, setProfilePhoto] = useState(guardData.profilePhoto || null);
  const fileInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const handleFileUpload = (e) => {
    setAadharCard(e.target.files[0]);
  };
  const handleProfileUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };
  const handleSubmit = () => {
    console.log({
      fullName,
      phoneNumber,
      gender,
      shift,
      shiftDate,
      shiftTime,
      aadharCard,
      profilePhoto,
    });
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] h-[750px] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Security</h2>
        <div className="flex justify-start mb-4">
          <img
            className="w-16 h-16 rounded-full"
            src={profilePhoto ? URL.createObjectURL(profilePhoto) : "/assets/Avatar.png"}
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
            accept="image/*"
          />
        </div>
        <div className="mb-4 w-[370px]">
          <label className="block text-gray-700">Full Name*</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-2 radius-[10px]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 w-[370px]">
          <label className="block text-gray-700">Phone Number*</label>
          <input
            type="tel"
            className="w-full border p-2 rounded mt-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-[175px]">
            <label className="block text-gray-700">Gender*</label>
            <select
              className="w-full border p-2 rounded mt-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Shift*</label>
            <select
              className="w-full border p-2 rounded mt-2"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              required
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
            <input
              type="date"
              className="w-full border p-2 rounded mt-2"
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Shift Time*</label>
            <input
              type="time"
              className="w-full border p-2 rounded mt-2"
              value={shiftTime}
              onChange={(e) => setShiftTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4 w-[370px] h-[167px]">
          <label className="block text-gray-700">Upload Aadhar Card*</label>
          <input
            type="file"
            className="w-full border p-2 rounded mt-2"
            onChange={handleFileUpload}
            required
          />
        </div>
        <div className="flex justify-between">
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
