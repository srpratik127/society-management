import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AddVisitorDetails = ({ isOpen, closeModal, addNewVisitor }) => {
  const initialVisitorState = {
    name: "",
    wing: "",
    unit: "",
    date: "",
    time: "",
  };

  const [newVisitor, setNewVisitor] = useState(initialVisitorState);

  useEffect(() => {
    if (!isOpen) {
      setNewVisitor(initialVisitorState); 
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setNewVisitor({ ...newVisitor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newVisitor.name || !newVisitor.wing || !newVisitor.unit || !newVisitor.date || !newVisitor.time) {
      toast.error("Please fill out all fields");
      return;
    }
    addNewVisitor(newVisitor);
    closeModal();
    toast.success("Visitor added successfully");
  };

  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative z-50">
        <h2 className="text-xl font-semibold mb-4">Add Visitor Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block outline-none text-gray-700">Visitor Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
               placeholder="Enter Name"
              value={newVisitor.name}
              onChange={handleChange}
              className="w-full p-2 border outline-none border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Wing<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="wing"
                 placeholder="Enter Wing"
                value={newVisitor.wing}
                onChange={handleChange}
                className="w-full p-2 border outline-none border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Unit<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="unit"
                placeholder="Enter Unit"
                value={newVisitor.unit}
                onChange={handleChange}
                className="w-full p-2 border outline-none border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Date<span className="text-red-500">*</span></label>
              <input
                type="date"
                name="date"
                value={newVisitor.date}
                onChange={handleChange}
                className="w-full p-2 border outline-none border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Time<span className="text-red-500">*</span></label>
              <input
                type="time"
                name="time"
                placeholder="Select Time"
                value={newVisitor.time}
                onChange={handleChange}
                className="w-full p-2 border outline-none border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="w-1/2 border gap-3 outline-none text-gray-700 rounded-lg py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisitorDetails;
