import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const EditProtocol = ({ protocol, onClose, setProtocols }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: new Date(),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (protocol) {
      setFormData({
        title: protocol.title,
        description: protocol.description,
        date: new Date(protocol.date),
        time: protocol.time ? new Date(protocol.time) : new Date(),
      });
    }
  }, [protocol]);

  const handleFieldChange = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: !value
        ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        : "",
    }));
  };

  const updateProtocol = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/protocol/${protocol._id}`,
        formData
      );
      const updatedProtocol = response.data.data;

      setProtocols((prevProtocols) =>
        prevProtocols.map((p) => (p._id === protocol._id ? updatedProtocol : p))
      );
      toast.success("Protocol Update successful!");
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key])
        acc[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      return acc;
    }, {});
    if (Object.keys(newErrors).length) return setErrors(newErrors);
    updateProtocol();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-[390px]">
        <h2 className="text-2xl font-semibold mb-4">Edit Security Protocols</h2>
        <form onSubmit={handleSubmit}>
          {["title", "description"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block font-semibold text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}*
              </label>
              {field === "description" ? (
                <textarea
                  value={formData[field]}
                  onChange={handleFieldChange(field)}
                  className={`w-full border ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } p-2 rounded-lg mt-1`}
                  placeholder={`Enter ${field}`}
                />
              ) : (
                <input
                  type="text"
                  value={formData[field]}
                  onChange={handleFieldChange(field)}
                  className={`w-full border ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } p-2 rounded-lg mt-1`}
                  placeholder={`Enter ${field}`}
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block font-semibold text-gray-700">Date*</label>
              <DatePicker
                selected={formData.date}
                onChange={handleFieldChange("date")}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className={`w-full border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } p-2 rounded-lg`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block font-semibold text-gray-700">Time*</label>
              <input
                type="time"
                value={formData.time}
                onChange={handleFieldChange("time")}
                className={`w-full border ${
                  errors.time ? "border-red-500" : "border-gray-300"
                } p-2 rounded-lg mt-1`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg w-[175px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg w-[175px] bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProtocol;
