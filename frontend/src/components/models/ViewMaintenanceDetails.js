import React from "react";

const ViewMaintenanceDetails = ({ onClose, maintenance }) => {
  console.log(maintenance);

  const currentDate = new Date();
  const penaltyDate = new Date(maintenance.penaltyDay);
  const isPenaltyApplied =
    currentDate >= penaltyDate && maintenance.status === "pending";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow w-96 p-4">
        <div className="flex justify-between border-b pb-2 mb-4 align-center">
          <p className="text-xl font-semibold">View Maintenance Details</p>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <img src="/assets/cross.svg" alt="Close" />
          </button>
        </div>

        <div className="flex items-center mb-5">
          <img
            src={maintenance?.user?.profile_picture}
            alt="User"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-lg capitalize">
              {maintenance?.user?.fullName}
            </h3>
            <p className="text-gray-500">
              {new Date(maintenance.dueDate).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-4 text-gray-700">
          <div className="flex flex-col pr-4 text-center">
            <span className="text-gray-500">Wing</span>
            <span className="font-semibold">{maintenance.user?.wing}</span>
          </div>
          <div className="flex flex-col text-center pr-4">
            <span className="text-gray-500">Unit</span>
            <span className="font-semibold">{maintenance.user?.unit}</span>
          </div>
          <div className="flex flex-col text-center pr-4">
            <span className=" text-gray-500">Status</span>
            <span className="font-semibold bg-purple-100 text-purple-600 rounded-2xl px-3 py-1">
              {maintenance.user?.role}
            </span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-gray-500">Amount</span>
            <span className="font-semibold text-green-600">
              ₹ {maintenance.amount}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col text-center pr-4">
            <span className="text-gray-500">Penalty</span>
            <span className="font-semibold text-red-600">
              {isPenaltyApplied ? maintenance.penaltyAmount : "--"}
            </span>
          </div>
          <div className="flex flex-col text-center pr-4">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold bg-yellow-100 text-yellow-600 rounded-2xl px-3 py-1 capitalize">
              {maintenance.status}
            </span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold bg-gray-100 text-gray-600 rounded-2xl px-3 py-1 capitalize">
              {maintenance.paymentMethod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMaintenanceDetails;
