import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateProtocol = ({ onClose, setProtocols }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  
  const validateField = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: value.trim() ? "" : `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const isValid = formData.title && formData.description;
    if (isValid) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/api/protocol`, formData);
        if (response.status === 200) {
          setProtocols((prev) => [...prev, response.data.data]);
          toast.success("Protocol Create successful!");
          onClose();
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    } else {
      ["title", "description"].forEach((field) => validateField(field, formData[field]));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4">Security Protocols</h2>
        <form onSubmit={handleSubmit}>
          {["title", "description"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block font-semibold text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}<span className="text-red-500">*</span>
              </label>
              {field === "description" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full border rounded-md outline-none p-2 mt-1 ${errors[field] && "border-red-500"}`}
                  placeholder={`Enter ${field}`}
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full border rounded-md outline-none p-2 mt-1 ${errors[field] && "border-red-500"}`}
                  placeholder={`Enter ${field}`}
                />
              )}
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={onClose} className="border font-semibold text-gray-700 w-1/2 py-2 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="w-1/2 py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white font-semibold rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProtocol;
