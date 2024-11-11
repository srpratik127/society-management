import React from "react";

const ViewExpense = ({ onClose, expense }) => {
  if (!expense) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">View Expense Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <img src="/assets/cross.svg" alt="Close" />
          </button>
        </div>
        <hr className="mb-4" />
        <div className="mb-4">
          <label className="font-medium text-gray-500">Title</label>
          <p className="font-medium text-gray-900">{expense.title}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium text-gray-500">Description</label>
          <p className="text-gray-900 overflow-y-auto text-wrap">
            {expense.description}
          </p>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="font-medium text-gray-500">Date</label>
            <p className="text-gray-900">
              {new Date(expense.updatedAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="w-1/2">
            <label className="font-medium text-gray-500">Amount</label>
            <p className="bg-gray-100 w-[50%] flex items-center justify-center rounded-full px-2 p-1">
              <span className="text-black mr-1">₹</span>
              {expense.amount}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-medium text-gray-500">Bill</label>
          <div className="flex items-center border rounded-lg p-2 mt-2">
            <img
              src="/assets/blueGallary.svg"
              alt=""
              className="h-10 w-10 mr-3"
            />
            <div>
              <p className="text-sm text-gray-900 text-wrap">{`...${expense.bill.slice(
                -18
              )}`}</p>
              <p className="text-sm text-gray-500">
                {expense.billSize || "20MB"}
              </p>
            </div>
            <button
              className="ml-auto"
              onClick={() =>
                window.open(
                  expense.bill,
                  "_blank",
                  "width=800,height=600, left=500, top=200"
                )
              }
            >
              <img
                src="/assets/eye.svg"
                alt=""
                className="h-6 w-6 text-gray-400"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
