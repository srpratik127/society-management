import axios from "axios";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const AddSecurity = ({ isOpen, onClose, setGuards }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    shift: "",
    shiftDate: "",
    shiftTime: "",
  });
  const [aadharCardFileName, setAadharCardFileName] = useState("");
  const [photoFileName, setPhotoFileName] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const user = useSelector((store) => store.auth.user);
  const [loader, setLoader] = useState(false);

  const handleFileChange = (setter) => (e) => setter(e.target.files[0]?.name || "");
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDateChange = (date) => setFormData({ ...formData, shiftDate: date });

  const validateForm = () => {
    const newErrors = ["fullName", "email", "phoneNumber", "gender", "shift", "shiftDate", "shiftTime"]
      .reduce((acc, field) => {
        if (!formData[field]) acc[field] = `${field} is required`;
        return acc;
      }, {});

    if (!aadharCardFileName) newErrors.aadharCardFileName = "Aadhar card upload is required";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoader(true);
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
      if (fileInputRef.current.files[0]) formDataToSend.append("aadhar_card", fileInputRef.current.files[0]);
      if (photoInputRef.current.files[0]) formDataToSend.append("profile_photo", photoInputRef.current.files[0]);
      formDataToSend.append("select_society", user.select_society);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/api/guard`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.data) {
        setGuards(prevGuards => [...prevGuards, response.data?.data]);
        toast.success("Guard Create successful!");
      }
      onClose();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data?.message);
    }
  };

  const isFormValid = Object.values(formData).every(Boolean) && aadharCardFileName;

  if (!isOpen) return null;

  const inputStyle = (error) =>
    `w-full border p-2 rounded mt-2 ${error ? "border-red-500 outline-none" : ""}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto ">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[90%] h-[90%] sm:w-[450px] lg:w-[400px] max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Security</h2>

        <div className="flex justify-start mb-4">
          <img
            className="w-16 h-16 rounded-full"
            src={photoFileName ? URL.createObjectURL(photoInputRef.current?.files[0]) : "/assets/empty.png"}
            alt="User"
          />
          <button className="text-blue-500 ml-4" onClick={() => photoInputRef.current.click()}>
            Add Photo
          </button>
          <input
            type="file"
            ref={photoInputRef}
            className="hidden"
            onChange={handleFileChange(setPhotoFileName)}
            accept=".png,.jpeg,.jpg,"
            required
          />
          {errors.photoFileName && <p className="text-red-500 text-xs">{errors.photoFileName}</p>}
        </div>

        {["fullName", "email", "phoneNumber"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700">{`${field.charAt(0).toUpperCase() + field.slice(1)}*`}</label>
            <input
              name={field}
              type={field === "email" ? "email" : "text"}
              maxLength={field === "phoneNumber" && "10"}
              className={`${inputStyle(errors[field])} outline-none`}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
          </div>
        ))}

        <div className="flex flex-wrap gap-4 mb-4">
          {["gender", "shift"].map((field) => (
            <div key={field} className="flex-1 min-w-[150px]">
              <label className="block text-gray-700">{`${field.charAt(0).toUpperCase() + field.slice(1)}*`}</label>
              <select
                name={field}
                className={`${inputStyle(errors[field])} outline-none`}
                value={formData[field]}
                onChange={handleChange}
              >
                <option value="">{`Select ${field.charAt(0).toUpperCase() + field.slice(1)}`}</option>
                {field === "gender"
                  ? ["Male", "Female"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                  : ["Day", "Night"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-gray-700">Shift Date*</label>
            <DatePicker
              selected={formData.shiftDate}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className={inputStyle(errors.shiftDate)}
            />
            {errors.shiftDate && <p className="text-red-500 text-xs">{errors.shiftDate}</p>}
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-gray-700">Shift Time*</label>
            <input
              name="shiftTime"
              type="time"
              className={inputStyle(errors.shiftTime)}
              value={formData.shiftTime}
              onChange={handleChange}
            />
            {errors.shiftTime && <p className="text-red-500 text-xs">{errors.shiftTime}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Aadhar Card*</label>
          <div
            onClick={() => fileInputRef.current.click()}
            className={`mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 cursor-pointer ${errors.aadharCardFileName && "border-red-500"
              }`}
          >
            <img src="/assets/addPhoto.svg" alt="Upload Icon" className="w-6 h-6" />
            <p className="mt-2 text-sm text-gray-700 font-medium">
              {aadharCardFileName || "Upload Aadhar Card"}
            </p>
            <span className="text-[#A7A7A7] text-sm mt-3">PNG, JPG, PDF up to 10MB</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".png,.jpeg,.jpg,"
            className="hidden"
            onChange={handleFileChange(setAadharCardFileName)}
            required
          />
          {errors.aadharCardFileName && <p className="text-red-500 text-xs">{errors.aadharCardFileName}</p>}
        </div>

        <div className="flex gap-3">
          <button
            className="bg-white border w-full border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 w-full rounded-lg ${isFormValid
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                : "bg-gray-100 text-gray-500"
              }`}
            onClick={handleSubmit}
            disabled={loader}
          >{!loader ? "Create" : <Loader />}</button>
        </div>
      </div>
    </div>

  );
};

export default AddSecurity;