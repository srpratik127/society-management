import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const EditNote = ({ note, onClose, setNotes }) => {
  const [formData, setFormData] = useState(note);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(note);
  }, [note]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDateChange = (date) => setFormData({ ...formData, date });

  const validateField = (field, value) =>
    setErrors((prev) => ({
      ...prev,
      [field]: value
        ? ""
        : `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, date } = formData;
    if (title && description && date) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/v1/api/notes/${note._id}`,
          { title, description, date }
        );
        setNotes((prev) =>
          prev.map((n) => (n._id === note._id ? response.data : n))
        );
        onClose();
        toast.success("Notes Update successful!");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    } else {
      ["title", "description", "date"].forEach((field) =>
        validateField(field, formData[field])
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="min-w-[370px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
        <form onSubmit={handleSubmit}>
          {["title", "description", "date"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block font-semibold text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}*
              </label>
              {field !== "date" ? (
                <input
                  type={field === "title" ? "text" : "textarea"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onBlur={(e) => validateField(field, e.target.value)}
                  className={`w-full border p-2 rounded-md outline-none mt-1 ${
                    errors[field] && "border-red-500"
                  }`}
                  placeholder={`Enter ${field}`}
                />
              ) : (
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  className={`w-full border p-2 rounded-md outline-none mt-1 ${
                    errors[field] && "border-red-500"
                  }`}
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 w-full rounded-lg border text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-lg w-full ${
                formData.title && formData.description && formData.date
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
