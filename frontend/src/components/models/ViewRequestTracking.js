import React from "react";

const ViewRequestTracking = ({ complaint, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-[390px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">View Request</h2>
          <button onClick={onClose}>
            <img src="/assets/cross.svg" alt="Close" />
          </button>
        </div>
        <div className="flex items-center mb-4">
          <img
            src={complaint.user?.profile_picture}
            className="w-12 h-12 rounded-full mr-4"
            alt="User avatar"
          />
          <div>
            <h3 className="font-semibold">{complaint.requesterName}</h3>
            <p className="text-gray-500 text-sm">
              {" "}
              {new Date(complaint.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-[#A7A7A7]">Request Name</p>
          <p className="text-gray-600">{complaint.requestName}</p>
        </div>
        <div className="flex justify-between text-center mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-[#A7A7A7]">Wing</span>
            <span className="text-sm text-gray-600">{complaint.wing}</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-sm text-[#A7A7A7]">Unit</span>
            <span className="text-sm text-gray-600">{complaint.unit}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#A7A7A7]">Priority</span>
            <span
              className={`text-sm py-1 px-2 rounded-2xl ${
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
            <span className="text-sm text-[#A7A7A7]">Status</span>
            <span
              className={`text-sm py-1 px-2 rounded-2xl ${
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
