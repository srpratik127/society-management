import React, { useState } from "react";
import PaymentPopup from "./PaymentPopup";

const DetailsViewPopup = ({ onClose, perPersonAmount, members, totalAmount }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleOpen = () => {
    setIsViewOpen(true);
  };

  const handleClosePopup = () => {
    setIsViewOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Detail of the Per Person</h2>

        <div className="flex justify-between items-center mb-4">
          <label className="text-gray-600 font-medium">Per Person Amount:</label>
          <span className="font-medium text-gray-700">
            {/* ₹ {perPersonAmount.toLocaleString()} */}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className="text-gray-600 font-medium">Total Member:</label>
          {/* <span className="font-medium text-gray-700">{members}</span> */}
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="text-gray-600 font-medium">Total Amount:</label>
          <span className="font-medium text-gray-800">
            {/* ₹ {totalAmount.toLocaleString()} */}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleOpen}
            className="w-1/2 py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg"
          >
            Pay Now
          </button>
        </div>
      </div>

      {isViewOpen && <PaymentPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default DetailsViewPopup;
