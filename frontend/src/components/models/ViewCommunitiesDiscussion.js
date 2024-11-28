import React from "react";

const ViewMaintenanceInvoice = ({ invoice, onClose }) => {
    if (!invoice) return null;
    return (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-50 flex justify-center items-center z-50  ">
            <div className="bg-white w-[50%] max-w-[410px] rounded-lg shadow-lg p-6 max-h-[90%] overflow-y-auto">

                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-lg font-medium">Maintenance Invoices</h2>
                    <button onClick={onClose}>
                        <img src="/assets/cross.svg" alt="" />
                    </button>
                </div>

                <div className="bg-[#F6F8FB] p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-2 gap-x-6 mb-4">
                        <div>
                            <p className="text-sm font-medium text-[#A7A7A7]">Invoice Id</p>
                            <p className="text-sm">12345</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#A7A7A7]">Owner Name</p>
                            <p className="text-sm">{invoice?.user?.fullName}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 mb-4">
                        <div>
                            <p className="text-sm font-medium text-[#A7A7A7]">Bill Date</p>
                            <p className="text-sm">10/02/2024</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#A7A7A7]">Payment Date</p>
                            <p className="text-sm">{invoice.penaltyDay}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-medium text-[#A7A7A7]">Phone Number</p>
                        <p className="text-sm">{invoice?.user?.phone}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-medium text-[#A7A7A7]">Email</p>
                        <p className="text-sm truncate">{invoice?.user?.email}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#A7A7A7]">Address</p>
                        <p className="text-sm">
                            2118 Thornridge Cir. Syracuse, Connecticut 35624
                        </p>
                    </div>
                </div>

                <div className="bg-[#F6F8FB] p-4 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-600">Maintenance Amount</p>
                        <p className="text-sm text-[#39973D]">₹ {invoice.amount}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-600">Penalty</p>
                        <p className="text-sm text-red-600">₹ 350.00</p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-600">Grand Total</p>
                        <p className="text-sm">₹ 1850.00</p>
                    </div>
                </div>

                <div className="bg-[#F6F8FB] p-4 rounded-lg mb-6">
                    <p className="text-sm text-[#A7A7A7]">Note</p>
                    <p className="text-sm text-gray-700">
                        A visual representation of your spending categories visual representation.
                    </p>
                </div>

                <button className="w-full bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white font-medium py-2 rounded-lg flex justify-center items-center gap-2">
                    <span><img src="/assets/arrow-down.svg" alt="Download Icon" /></span> Download Invoice
                </button>
            </div>
        </div>
    );
};

export default ViewMaintenanceInvoice;
