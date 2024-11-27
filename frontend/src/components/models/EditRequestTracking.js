import React, { useState } from 'react';

const EditRequestTracking = ({ onClose, existingData }) => {
  const [complainerName, setComplainerName] = useState(existingData?.complainerName || '');
  const [requestDate, setRequestDate] = useState(existingData?.requestDate || '');
  const [wing, setWing] = useState(existingData?.wing || '');
  const [unit, setUnit] = useState(existingData?.unit || '');
  const [priority, setPriority] = useState(existingData?.priority || 'Medium');
  const [status, setStatus] = useState(existingData?.status || 'Open');
  const [requestName, setRequestName] = useState(existingData?.requestName || '');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      complainerName,
      requestName,
      requestDate,
      wing,
      unit,
      priority,
      status,
    });
    onClose(); 
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Complainer Name*</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={complainerName}
              onChange={(e) => setComplainerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Request Name*</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={requestName}
              onChange={(e) => setRequestName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Request Date*</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={requestDate}
              onChange={(e) => setRequestDate(e.target.value)}
              required
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block text-gray-700">Wing*</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                value={wing}
                onChange={(e) => setWing(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Unit*</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#202224]">
              Priority
            </label>
            <div className="mt-1 flex space-x-4">
              {['High', 'Medium', 'Low'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPriority(level)}
                  className={`px-4 py-2 flex gap-2 border rounded-lg font-medium ${
                    priority === level
                      ? 'border-[#FE512E]'
                      : 'border-gray-200 text-[#A7A7A7]'
                  }`}
                >
                  <img
                    src={`${
                      priority === level
                        ? '/assets/fill-redio.svg'
                        : '/assets/unfill-redio.svg'
                    }`}
                    alt=""
                  />
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#202224]">
              Status
            </label>
            <div className="mt-1 flex space-x-4">
              {['Open', 'Pending', 'Solve'].map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => setStatus(state)}
                  className={`px-4 py-2 flex gap-2 border rounded-lg font-medium ${
                    status === state
                      ? 'border-[#FE512E]'
                      : 'border-gray-200 text-[#A7A7A7]'
                  }`}
                >
                  <img
                    src={`${
                      status === state
                        ? '/assets/fill-redio.svg'
                        : '/assets/unfill-redio.svg'
                    }`}
                    alt=""
                  />
                  {state}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#D3D3D3] w-full text-[#202224] font-semibold py-2 px-4 rounded-md mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full font-semibold py-2 px-4 rounded-md bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequestTracking;
