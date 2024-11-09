import React, { useState } from 'react';

const CreateFacilityManagement = ({ onClose, onSave }) => {
  const [facilityName, setFacilityName] = useState('');
  const [description, setDescription] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [remindBefore, setRemindBefore] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!facilityName) formErrors.facilityName = 'Facility name is required';
    if (!description) formErrors.description = 'Description is required';
    if (!scheduleDate) formErrors.scheduleDate = 'Schedule date is required';
    if (!remindBefore) formErrors.remindBefore = 'Reminder is required';
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
      return; 
    }
    const facilityData = {
      facilityName,
      description,
      scheduleDate,
      remindBefore,
    };
    onSave(facilityData);
    onClose();
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Facility</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Facility Name*</label>
            <input
              type="text"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className={`w-full border ${errors.facilityName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
              placeholder="Enter Name"
            />
            {errors.facilityName && <p className="text-red-500 text-sm">{errors.facilityName}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
              placeholder="Enter Description"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Schedule Service Date*</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className={`w-full border ${errors.scheduleDate ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
            />
            {errors.scheduleDate && <p className="text-red-500 text-sm">{errors.scheduleDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Remind Before</label>
            <select
              value={remindBefore}
              onChange={(e) => setRemindBefore(e.target.value)}
              className={`w-full border ${errors.remindBefore ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mt-1`}
            >
              <option value="" disabled>Select Reminder</option>
              <option value="1-day">1-day</option>
              <option value="2-day">2-day</option>
              <option value="3-day">3-day</option>
              <option value="4-day">4-day</option>
            </select>
            {errors.remindBefore && <p className="text-red-500 text-sm">{errors.remindBefore}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border w-[175px] border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-lg w-[175px] ${facilityName && description && scheduleDate && remindBefore ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white' : 'bg-gray-300 text-gray-500'}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFacilityManagement;
