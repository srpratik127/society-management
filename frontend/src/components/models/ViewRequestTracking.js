import React from "react";

const ViewRequestTracking = ({ complaint, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">View Request</h2>
          <button onClick={onClose}>
            <img src="/assets/cross.svg" alt="Close" />
          </button>
        </div>
        <div className="flex items-center mb-4">
          <img
            src="/assets/Avatar.png"
            className="w-12 h-12 rounded-full mr-4"
            alt="User avatar"
          />
          <div>
            <h3 className="font-semibold">{complaint.name}</h3>
            <p className="text-gray-500 text-sm">{complaint.date}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Complainer Name</p>
          <p className="text-gray-600">{complaint.complaintName}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Description</p>
          <p className="text-gray-600">{complaint.description}</p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">Wing</span>
            <span className="text-sm text-gray-600">{complaint.wing}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">Unit</span>
            <span className="text-sm text-gray-600">
              {complaint.unitNumber}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              Priority
            </span>
            <span
              className={`text-sm py-1 px-2 rounded-lg ${
                complaint.priority === "High"
                  ? "bg-red-500 text-white"
                  : complaint.priority === "Medium"
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {complaint.priority}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">Status</span>
            <span
              className={`text-sm py-1 px-2 rounded-lg ${
                complaint.status === "Pending"
                  ? "bg-yellow-300 text-gray-800"
                  : complaint.status === "Open"
                  ? "bg-blue-200 text-gray-800"
                  : "bg-green-200 text-gray-800"
              }`}
            >
              {complaint.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRequestTracking;
