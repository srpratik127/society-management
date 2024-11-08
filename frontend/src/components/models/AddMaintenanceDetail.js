import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const AddMaintenanceDetail = ({ onClose }) => {
  const [maintenanceAmount, setMaintenanceAmount] = useState('');
  const [penaltyAmount, setPenaltyAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [penaltyAfterDays, setPenaltyAfterDays] = useState('');
  const [errors, setErrors] = useState({});

  const isFormComplete = maintenanceAmount && penaltyAmount && dueDate && penaltyAfterDays;

  const handleApply = async () => {
    const newErrors = {
      maintenanceAmount: maintenanceAmount ? '' : 'Maintenance Amount is required.',
      penaltyAmount: penaltyAmount ? '' : 'Penalty Amount is required.',
      dueDate: dueDate ? '' : 'Due Date is required.',
      penaltyAfterDays: penaltyAfterDays ? '' : 'Penalty Days selection is required.',
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      console.log({ maintenanceAmount, penaltyAmount, dueDate, penaltyAfterDays });

      const payload = {
        amount: maintenanceAmount,
        penaltyAmount: penaltyAmount,
        dueDate: dueDate,
        penaltyDay: penaltyAfterDays,
      };
  
      try {
        const response = await axios.post("http://localhost:5000/api/maintenance", payload);
        console.log("API response:", response.data);
        // Reset fields if needed
        setMaintenanceAmount("");
        setPenaltyAmount("");
        setDueDate("");
        setPenaltyAfterDays("");
      } catch (error) {
        console.error("Error submitting maintenance details:", error);
        // Handle error or show message to user
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add Maintenance Detail</h2>

        <div className="flex gap-2">
          {[
            { label: 'Maintenance Amount', value: maintenanceAmount, setValue: setMaintenanceAmount, error: errors.maintenanceAmount },
            { label: 'Penalty Amount', value: penaltyAmount, setValue: setPenaltyAmount, error: errors.penaltyAmount }
          ].map(({ label, value, setValue, error }, index) => (
            <div key={index} className="mb-4 w-1/2">
              <label className="block text-xs py-2 font-medium text-gray-700">{label}</label>
              <div className={`flex items-center p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
                <span className="font-bold">₹</span>
                <input
                  type="number"
                  className="ml-2 w-full outline-none"
                  placeholder="0000"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-xs py-2 font-medium text-gray-700">Maintenance Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM"
            placeholderText="Select a month"
            className={`w-full border rounded-md outline-none p-2 ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dueDate && <div className="text-red-500 text-sm mt-1">{errors.dueDate}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-xs py-2 font-medium text-gray-700">Penalty Applied After Day Selection</label>
          <select
            className={`w-full border text-xs rounded-md p-2 ${errors.penaltyAfterDays ? 'border-red-500' : 'border-gray-300'}`}
            value={penaltyAfterDays}
            onChange={(e) => setPenaltyAfterDays(e.target.value)}
          >
            <option value="" disabled>Select Penalty Applied After Day Selection</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="60">02 month</option>
          </select>
          {errors.penaltyAfterDays && <div className="text-red-500 text-sm mt-1">{errors.penaltyAfterDays}</div>}
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-white rounded-md border">
            Cancel
          </button>
          <button
            onClick={handleApply}
            className={`px-6 py-2  font-semibold rounded-md ${isFormComplete ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white' : 'bg-[#F6F8FB] text-[#202224]'}`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMaintenanceDetail;
