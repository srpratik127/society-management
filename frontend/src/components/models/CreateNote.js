import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const CreateNote = ({ onClose, setNotes }) => {
  const [note, setNote] = useState({ title: "", description: "", date: "" });
  const [errors, setErrors] = useState({});
  const isFormValid =
    Object.values(note).every((val) => val) &&
    !Object.values(errors).some((err) => err);

  const handleChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value });
  const handleDateChange = (date) => setNote({ ...note, date });

  const validateField = (field, value) => {
    const isString = typeof value === "string";
    setErrors((prev) => ({
      ...prev,
      [field]: isString
        ? value.trim()
          ? ""
          : `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        : value
        ? ""
        : "Date is required.",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, date } = note;

    if (isFormValid) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/notes`, {
          title,
          description,
          date,
        });
        setNote({ title: "", description: "", date: "" });
        setNotes((prevNotes) => [...prevNotes, response.data]);
        onClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      ["title", "description", "date"].forEach((field) =>
        validateField(field, note[field])
      );
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Add Note</h2>
        <form onSubmit={handleSubmit}>
          {["title", "description"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block font-semibold text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}*
              </label>
              <input
                type={field === "description" ? "textarea" : "text"}
                name={field}
                value={note[field]}
                onChange={handleChange}
                onBlur={(e) => validateField(field, e.target.value)}
                className={`w-full border p-2 rounded outline-none mt-1 ${
                  errors[field] && "border-red-500"
                }`}
                placeholder={`Enter ${field}`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Date*</label>
            <DatePicker
              selected={note.date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className={`block w-full border rounded p-2 outline-none ${
                errors.date && "border-red-500"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border w-full py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-lg w-full ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                  : "bg-[#F6F8FB] text-black"
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

export default CreateNote;
