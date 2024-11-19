import React, { useState } from "react";

const PaymentPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                    <butt className="flex items-center gap-3 bg-[#ffff] shadow rounded-lg p-2 cursor-pointer">
                        <img src="/assets/MasterCard.svg" alt="" />
                        <label htmlFor="masterCard" className="flex items-center">
                            Master Card
                        </label>
                    </butt>
                    <div className="flex items-center gap-3 bg-[#ffff] shadow rounded-lg p-2 cursor-pointer">
                        <img src="/assets/visa.svg" alt="" />
                        <label htmlFor="visaCard" className="flex items-center">
                            Visa Card
                        </label>
                    </div>
                    <div className="flex items-center gap-3 bg-[#ffff] shadow rounded-lg p-2 cursor-pointer">
                        <img src="/assets/CashPayment.svg" alt="" />
                        <label htmlFor="cashPayment">
                            <span className="flex items-center">
                                Cash Payment
                            </span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-between mt-6 gap-4">
                    <button
                        onClick={onClose}
                        className="w-1/2 px-4 py-2 border rounded-lg text-gray-700"
                    >
                        Cancel
                    </button>
                    <button className="w-1/2 px-4 py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;
