import React from 'react';

const ViewExpense = ({ onClose, expense }) => {
    if (!expense) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
            <div className="bg-white w-90 max-w-md p-6 rounded-lg shadow-lg relative">
                <div className='flex justify-between items-center relative'>
                    <h2 className="text-lg font-semibold mb-4">View Expense Details</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <img src="/assets/cross.svg" alt="Close" />
                    </button>
                </div>
                <hr className="mb-4" />
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-500">Title</label>
                    <p className="text-sm font-medium text-gray-900">{expense.title}</p>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="text-sm text-gray-900 overflow-y-auto text-wrap">{expense.Description}</p>
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="text-sm font-medium text-gray-500">Date</label>
                        <p className="text-sm text-gray-900">{expense.date}</p>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium text-gray-500">Amount</label>
                        <p className="text-sm bg-gray-100 w-[50%] flex items-center justify-center rounded-full px-2 p-1">
                            <span className='text-black mr-1'>₹</span>{expense.amount}
                        </p>
                    </div>

                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-500">Bill</label>
                    <div className="flex items-center border rounded-lg p-2 mt-2">
                        <img src="/assets/blueGallary.svg" alt="" className="h-10 w-10 mr-3" />
                        <div>
                            <p className="text-sm text-gray-900">{expense.billName}</p>
                            <p className="text-xs text-gray-500">{expense.billSize}</p>
                        </div>
                        <button className="ml-auto">
                            <img src="/assets/eye.svg" alt="" className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewExpense;
