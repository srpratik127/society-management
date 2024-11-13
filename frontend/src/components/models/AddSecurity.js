import React, { useState, useRef } from 'react';

const AddSecurity = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: '',
    shift: '',
    shiftDate: '',
    shiftTime: '',
  });
  const [aadharCardFileName, setAadharCardFileName] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAadharCardFileName(file.name);
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFileName(file.name);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    const newErrors = ["fullName", "phoneNumber", "gender", "shift", "shiftDate", "shiftTime"].reduce((acc, field) => {
      if (!formData[field]) acc[field] = `${field} is required`;
      return acc;
    }, {});
    if (!aadharCardFileName) newErrors.aadharCardFileName = 'Aadhar card upload is required';
    if (!photoFileName) newErrors.photoFileName = 'Photo upload is required';
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      console.log({
        ...formData,
        aadharCard: fileInputRef.current.files[0],
        profilePhoto: photoInputRef.current.files[0],
      });
      onClose();
    }
  };
  const isFormValid = Object.values(formData).every((value) => value) && aadharCardFileName && photoFileName;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] h-[730px] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Security</h2>
        <div className="flex justify-start mb-4">
          <img
            className="w-16 h-16 rounded-full"
            src={photoFileName ? URL.createObjectURL(photoInputRef.current?.files[0]) : '/assets/Avatar.png'}
            alt="User"
          />
          <button
            className="text-blue-500 ml-4"
            onClick={() => photoInputRef.current.click()}
          >
            Add Photo
          </button>
          <input
            type="file"
            ref={photoInputRef}
            className="hidden"
            onChange={handlePhotoChange}
            accept="image/*"
            required
          />
          {errors.photoFileName && <p className="text-red-500 text-xs">{errors.photoFileName}</p>}
        </div>
        <div className="mb-4 w-[370px]">
          <label className="block text-gray-700">Full Name*</label>
          <input
            name="fullName"
            type="text"
            className="w-full border p-2 rounded mt-2"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
        </div>
        <div className="mb-4 w-[370px]">
          <label className="block text-gray-700">Phone Number*</label>
          <input
            name="phoneNumber"
            type="tel"
            className="w-full border p-2 rounded mt-2"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-[175px]">
            <label className="block text-gray-700">Gender*</label>
            <select
              name="gender"
              className="w-full border p-2 rounded mt-2"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Shift*</label>
            <select
              name="shift"
              className="w-full border p-2 rounded mt-2"
              value={formData.shift}
              onChange={handleChange}
              required
            >
              <option value="">Select Shift</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
            </select>
            {errors.shift && <p className="text-red-500 text-xs">{errors.shift}</p>}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Shift Date*</label>
            <input
              name="shiftDate"
              type="date"
              className="w-full border p-2 rounded mt-2"
              value={formData.shiftDate}
              onChange={handleChange}
              required
            />
            {errors.shiftDate && <p className="text-red-500 text-xs">{errors.shiftDate}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Shift Time*</label>
            <input
              name="shiftTime"
              type="time"
              className="w-full border p-2 rounded mt-2"
              value={formData.shiftTime}
              onChange={handleChange}
              required
            />
            {errors.shiftTime && <p className="text-red-500 text-xs">{errors.shiftTime}</p>}
          </div>
        </div>
        <div className="mb-4 w-[370px]">
          <label className="block text-gray-700">Upload Aadhar Card*</label>
          <div
            onClick={() => fileInputRef.current.click()}
            className={`mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 cursor-pointer ${
              errors.aadharCardFileName && 'border-red-500'
            }`}
          >
            <img
              src="/assets/addPhoto.svg"
              alt="Upload Icon"
              className="w-6 h-6"
            />
            {aadharCardFileName ? (
              <p className="mt-2 text-sm text-gray-700 font-medium">
                {aadharCardFileName}
              </p>
            ) : (
              <p className="mt-2 text-sm text-blue-500 font-medium">
                Upload Aadhar Card
              </p>
            )}
            <span className="text-[#A7A7A7] text-sm mt-3">
              PNG, JPG, PDF up to 10MB
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            required
          />
          {errors.aadharCardFileName && (
            <p className="text-red-500 text-xs">{errors.aadharCardFileName}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-white border w-full border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 w-full rounded-lg ${isFormValid ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white' : 'bg-gray-300 text-gray-500'}`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSecurity;
