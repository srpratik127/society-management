import React, { useState, useEffect } from 'react';

const EditProtocol = ({ protocol, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (protocol) {
      setTitle(protocol.title);
      setDescription(protocol.description);
      setDate(protocol.date);
      setTime(protocol.time);
    }
  }, [protocol]);
  const validateField = (field, value) => {
    let error = '';
    if (!value) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
    return error;
  };
  const handleFieldChange = (setter, fieldName) => (e) => {
    const value = e.target.value;
    setter(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validateField(fieldName, value),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!title) formErrors.title = 'Title is required.';
    if (!description) formErrors.description = 'Description is required.';
    if (!date) formErrors.date = 'Date is required.';
    if (!time) formErrors.time = 'Time is required.';
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
      return;
    }
    const updatedProtocol = { title, description, date, time };
    onSave(updatedProtocol); 
    onClose(); 
  };
  const isFormValid = title && description && date && time;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Security Protocols</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Title*</label>
            <input
              type="text"
              value={title}
              onChange={handleFieldChange(setTitle, 'title')}
              className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
              placeholder="Enter title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Description*</label>
            <textarea
              value={description}
              onChange={handleFieldChange(setDescription, 'description')}
              className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
              placeholder="Enter description"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block font-semibold text-gray-700">Date*</label>
              <input
                type="date"
                value={date}
                onChange={handleFieldChange(setDate, 'date')}
                className={`w-full border ${errors.date ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>
            <div className="w-1/2">
              <label className="block font-semibold text-gray-700">Time*</label>
              <input
                type="time"
                value={time}
                onChange={handleFieldChange(setTime, 'time')}
                className={`w-full border ${errors.time ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg w-[175px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg w-[175px] ${isFormValid ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white' : 'bg-gray-300 text-gray-500'}`}
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
