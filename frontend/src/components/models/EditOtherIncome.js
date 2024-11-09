import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

const EditOtherIncome = ({ onClose, selectedItem, setIncomeData }) => {
  const [amount, setAmount] = useState(selectedItem?.amount);
  const [date, setDate] = useState(selectedItem?.date);
  const [dueDate, setDueDate] = useState(selectedItem?.dueDate);
  const [description, setDescription] = useState(selectedItem?.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedIncome = {
      amount,
      date,
      dueDate,
      description,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/income/${selectedItem._id}`,
        updatedIncome
      );
      setIncomeData(prevData =>
        prevData.map(item =>
          item.id === selectedItem.id ? { ...item, ...updatedIncome } : item
        )
      );
      onClose(); 
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{selectedItem.title}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <div className="flex border rounded-lg overflow-hidden">
              <span className="flex items-center justify-center text-lg pl-3 py-2">
                ₹
              </span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=" 0000"
                className="w-full pr-3 py-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className={`w-full border rounded-md outline-none p-2`}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Due Date</label>
              <DatePicker
                selected={dueDate}
                onChange={(dueDate) => setDueDate(dueDate)}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className={`w-full border rounded-md outline-none p-2`}
              />
            </div>
          </div>
          <div className="text-sm">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 w-full border rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOtherIncome;
