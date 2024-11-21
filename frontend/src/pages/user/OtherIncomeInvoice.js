import React, { useState } from "react";
import { otherIncomeInvoiceData } from "../../data/otherIncomeInvoiceData";
import DetailPopup from "../../components/models/DetailPopup";
import MaintanceInvoiceTable from "../../components/user/ViewInvoice";

const OtherIncomeInvoice = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  

  const handlePayNowClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 m-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Due Event Payment</h2>
        <button
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg shadow"
        >
          View Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {otherIncomeInvoiceData.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow flex flex-col justify-between"
          >
            <div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
              <p className="font-semibold">{item.title}</p>
              <p className="bg-[#FFFFFF1A] text-sm px-3 py-1 rounded-full">
                {item.status}
              </p>
            </div>
            <div className="p-2">
              <div className="text-gray-700 flex justify-between p-2">
                <p>Event Name:</p>
                <p>{item.eventName}</p>
              </div>
              <div className="text-gray-700 flex justify-between px-2">
                <p>Event Due Date:</p>
                <p>{item.dueDate}</p>
              </div>
              <div className="text-[#E74C3C] flex justify-between p-2 pb-0">
                <p>Amount:</p>
                <p>{item.amount}</p>
              </div>
            </div>
            <button
              onClick={handlePayNowClick}
              className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg shadow m-2"
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>
      {isPopupOpen && <DetailPopup onClose={handleClosePopup} />}

    </div>
  );
};

export default OtherIncomeInvoice;
