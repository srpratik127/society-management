import React, { useState } from 'react';

const AddMaintenanceDetail = ({ onClose }) => {
  const [maintenanceAmount, setMaintenanceAmount] = useState('');
  const [penaltyAmount, setPenaltyAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [penaltyAfterDays, setPenaltyAfterDays] = useState('');
  const [errors, setErrors] = useState({
    maintenanceAmount: '',
    penaltyAmount: '',
    dueDate: '',
    penaltyAfterDays: '',
  });

  const handleApply = () => {
    const newErrors = { maintenanceAmount: '', penaltyAmount: '', dueDate: '', penaltyAfterDays: '' };
    if (!maintenanceAmount) newErrors.maintenanceAmount = 'Maintenance Amount is required.';
    if (!penaltyAmount) newErrors.penaltyAmount = 'Penalty Amount is required.';
    if (!dueDate) newErrors.dueDate = 'Due Date is required.';
    if (!penaltyAfterDays) newErrors.penaltyAfterDays = 'Penalty Days selection is required.';

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);
    console.log({
      maintenanceAmount,
      penaltyAmount,
      dueDate,
      penaltyAfterDays,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add Maintenance Detail</h2>

        <div className="flex gap-2">
          <div className="mb-4">
            <label className="block text-xs py-2 font-medium text-gray-700">Maintenance Amount</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <span className="font-bold">₹</span>
              <input
                type="number"
                className="ml-2 w-full outline-none"
                placeholder="0000"
                value={maintenanceAmount}
                onChange={(e) => setMaintenanceAmount(e.target.value)}
              />
            </div>
            {errors.maintenanceAmount && (
              <div className="text-red-500 text-sm mt-1">{errors.maintenanceAmount}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs py-2 font-medium text-gray-700">Penalty Amount</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <span className="font-bold">₹</span>
              <input
                type="number"
                className="ml-2 w-full outline-none"
                placeholder="0000"
                value={penaltyAmount}
                onChange={(e) => setPenaltyAmount(e.target.value)}
              />
            </div>
            {errors.penaltyAmount && (
              <div className="text-red-500 text-sm mt-1">{errors.penaltyAmount}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs py-2 font-medium text-gray-700">Maintenance Due Date</label>
          <input
            type="date"
            className="w-full border text-xs border-gray-300 rounded-md p-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && (
            <div className="text-red-500 text-sm mt-1">{errors.dueDate}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-xs py-2 font-medium text-gray-700">Penalty Applied After Day Selection</label>
          <select
            className="w-full border text-xs border-gray-300 rounded-md p-2"
            value={penaltyAfterDays}
            onChange={(e) => setPenaltyAfterDays(e.target.value)}
          >
            <option value="" disabled>Select Penalty Applied After Day Selection</option>
            <option value="1">1 Day</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
          </select>
          {errors.penaltyAfterDays && (
            <div className="text-red-500 text-sm mt-1">{errors.penaltyAfterDays}</div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-[fffff] rounded-md border"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 text-black font-semibold bg-[#F6F8FB] rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMaintenanceDetail;
