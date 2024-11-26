import React, { useRef, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const AddExpensesDetails = ({ onClose, setExpansesData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    amount: "",
  });
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    });
  };

  const validateForm = () => {
    const newErrors = ["title", "description", "date", "amount"].reduce(
      (acc, field) => {
        if (!formData[field]) acc[field] = `${field} is required`;
        return acc;
      },
      {}
    );
    if (!fileName) newErrors.fileName = "File upload is required";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { title, description, date, amount } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append("title", title);
        formDataToSend.append("dueDate", date);
        formDataToSend.append("description", description);
        formDataToSend.append("amount", amount);
        formDataToSend.append("bill", fileInputRef.current.files[0]);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/api/expenses`,
          formDataToSend
        );
        toast.success("Expenses Create successful!");
        setExpansesData((pre) => [...pre, response.data?.data]);
        onClose();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4">Add Expenses Details</h2>
        <hr className="mb-4" />
        {["title", "description"].map((field) => (
          <div key={field} className="mb-4">
            <label className="text-sm font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <span className="text-red-500">*</span>
            </label>
            <input
              name={field}
              type="text"
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
              className={`block w-full border rounded-lg p-2 text-sm outline-none ${
                errors[field] && "border-red-500"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="text-sm font-medium">
              Date<span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className={`block w-full border rounded-lg p-2 outline-none ${
                errors.date && "border-red-500"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="text-sm font-medium">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              name="amount"
              type="number"
              placeholder="₹ 0000"
              value={formData.amount}
              onChange={handleChange}
              className={`block w-full border rounded-lg p-2 outline-none ${
                errors.amount && "border-red-500"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">
            Upload Bill<span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => fileInputRef.current.click()}
            className={`mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 cursor-pointer ${
                errors.fileName && "border-red-500"
              }`}
          >
            <img
              src="/assets/addPhoto.svg"
              alt="Upload Icon"
              className="w-6 h-6"
            />
            {fileName ? (
              <p className="mt-2 text-sm text-gray-700 font-medium">
                {fileName}
              </p>
            ) : (
              <p className="mt-2 text-sm text-blue-500 font-medium">
                Upload a file
              </p>
            )}
            <span className="text-[#A7A7A7] text-sm mt-3">
              PNG, JPG, GIF up to 10MB
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".png,.jpeg,.jpg,"
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.fileName && (
            <p className="text-red-500 text-xs">{errors.fileName}</p>
          )}
        </div>
        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="w-1/2 border text-gray-700 rounded-lg py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg py-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpensesDetails;
