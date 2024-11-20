import React, { useState } from 'react';
import PaymentPopup from '../../components/models/PaymentPopup';
import MaintanceInvoiceTable from '../../components/user/MaintanceinvoiceTable';

const MaintenanceInvoices = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDueMaintenance, setIsDueMaintenance] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);

    const handleButtonClick = () => {
        setShowInvoice(true);
    };

    const handlePayNowClick = () => {
        setIsPopupOpen(true);
    };

    const hendelDuePay = () => {
        setIsDueMaintenance(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setIsDueMaintenance(false);
    };

    return (
        <div className="p-4 space-y-6">
            {showInvoice ? (
                // Only show MaintanceInvoiceTable when showInvoice is true
                <MaintanceInvoiceTable />
            ) : (
                // Main content when showInvoice is false
                <>
                    <div className="flex flex-col md:flex-row justify-between bg-white shadow rounded-lg p-6 items-center space-y-4 md:space-y-0">
                        <div className="flex justify-start w-full md:w-auto sm:items-center">
                            <h2 className="text-lg font-semibold">Show Maintenance Details</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-end">
                            <div className="bg-white shadow rounded-lg p-4 w-full sm:w-[230px] flex flex-col justify-center">
                                <div className="text-gray-500">Maintenance Amount</div>
                                <div className="text-green-500 font-bold text-xl">
                                    <h1>₹ 1500</h1>
                                </div>
                            </div>
                            <div className="bg-white shadow rounded-lg p-4 w-full sm:w-[230px] flex flex-col justify-center">
                                <div className="text-gray-500">Penalty Amount</div>
                                <div className="text-red-500 font-bold text-xl">
                                    <h1>₹ 500</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Pending Maintenance</h2>
                            <button
                                className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-md shadow"
                                onClick={handleButtonClick}
                            >
                                View Invoice
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* {maintenanceData.pendingMaintenance.map((item, index) => (
                                <div key={index} className="bg-white shadow rounded-lg">
                                    <div className="bg-blue-500 text-white rounded-t-lg p-3 flex justify-between items-center">
                                        <span>Maintenance</span>
                                        <span className="bg-white bg-opacity-10 px-3 py-1 rounded-full">Pending</span>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="flex justify-between text-gray-700">
                                            <p>Bill Date</p>
                                            <p>{item.billDate}</p>
                                        </div>
                                        <div className="flex justify-between text-gray-700 border-b pb-2">
                                            <p>Pending Date</p>
                                            <p>{item.pendingDate}</p>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <p>Maintenance Amount</p>
                                            <p>₹ {item.maintenanceAmount}</p>
                                        </div>
                                        <div className="flex justify-between text-red-600 border-b pb-2">
                                            <p>Penalty Amount</p>
                                            <p>₹ {item.penaltyAmount}</p>
                                        </div>
                                        <div className="flex justify-between font-semibold text-green-600">
                                            <p>Grand Total</p>
                                            <p>₹ {item.grandTotal}</p>
                                        </div>
                                        <button
                                            onClick={handlePayNowClick}
                                            className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg shadow m-2"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Due Maintenance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* {maintenanceData.dueMaintenance.map((item, index) => (
                                <div key={index} className="bg-white shadow rounded-lg">
                                    <div className="bg-blue-500 text-white rounded-t-lg p-3 flex justify-between items-center">
                                        <span>Maintenance</span>
                                        <span className="bg-white bg-opacity-10 px-3 py-1 rounded-full">Pending</span>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="flex justify-between text-gray-700 border-b pb-2">
                                            <p>Date</p>
                                            <p>{item.date}</p>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <p>Amount</p>
                                            <p>₹ {item.amount}</p>
                                        </div>
                                        <div className="flex justify-between text-red-600 border-b pb-2">
                                            <p>Due Maintenance Amount</p>
                                            <p>₹ {item.duePenaltyAmount}</p>
                                        </div>
                                        <button
                                            className="w-full py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-md font-semibold"
                                            onClick={hendelDuePay}
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                    <PaymentPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                    <PaymentPopup isOpen={isDueMaintenance} onClose={handleClosePopup} />
                </>
            )}
        </div>
    );
};

export default MaintenanceInvoices;
