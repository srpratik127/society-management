import React, { useState } from "react";
import ViewMaintenanceDetails from "../models/ViewMaintenanceDetails";

const ViewMaintenance = ({ maintenance }) => {
  const [selectedMaintenance, setSelectedMaintenance] = useState();
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);

  return (
    <>
      <div
        className="bg-white shadow rounded-lg overflow-y-auto"
        style={{ maxHeight: "60vh" }}
      >
        <table className="w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2 text-center">Unit Number</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2 text-center">Penalty</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {maintenance?.length > 0 ? (
              maintenance.map((maintenance, index) => {
                const currentDate = new Date();
                const penaltyDate = new Date(maintenance.penaltyDay);
                const isPenaltyApplied = currentDate >= penaltyDate && maintenance.status === 'pending';
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 flex items-center space-x-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={maintenance?.user?.profile_picture}
                        alt="Profile"
                      />
                      <span>{maintenance?.user?.fullName}</span>
                    </td>
                    <td className="text-center">
                      <span className="p-2 text-[#5678E9] bg-[#F6F8FB] font-semibold py-1 rounded-full">
                        {maintenance?.user?.wing}
                      </span>
                      <span>{maintenance.user?.unit}</span>
                    </td>
                    <td className="px-4 text-center py-2">
                      {new Date(maintenance.updatedAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-center">
                      <span
                        className={`flex items-center justify-center ${
                          maintenance?.user?.role === "tenant"
                            ? "text-[#EC4899] font-semibold py-2 px-4 rounded-full bg-[#FFF1F8]"
                            : "text-[#4F46E5] font-semibold py-2 px-4 rounded-full bg-[#F1F0FF]"
                        }`}
                      >
                        <img
                          src={
                            maintenance?.user?.role === "owner"
                              ? "/assets/owner.svg"
                              : "/assets/user.svg"
                          }
                          alt="Icon"
                          className="h-5 w-5 mr-2"
                        />
                        {maintenance.user?.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">+91 {maintenance.user?.phone}</td>
                    <td className="px-4 py-2 text-green-600">
                      ₹ {maintenance.amount}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`flex items-center justify-center rounded-full py-2 px-4 ${isPenaltyApplied ?"text-[#FFFFFF] font-semibold  bg-[#E74C3C]" : "bg-[#F6F8FB]"}`}
                      >
                        {isPenaltyApplied ? maintenance.penaltyAmount : "--"}
                      </span>
                    </td>
                    <td className="px-4 text-center ">
                      <span
                        className={`px-2 py-2 rounded-full flex items-center justify-center ${
                          maintenance.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                        aria-label={`${maintenance.status} Status`}
                      >
                        <img
                          src={
                            maintenance.status === "pending"
                              ? "/assets/timer.svg"
                              : "/assets/tickmark.svg"
                          }
                          alt="Icon"
                          className="h-5 w-5 mr-2"
                        />
                        {maintenance.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-2 flex items-center justify-center rounded-full ${
                          maintenance.paymentMethod === "Online"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        aria-label={`${maintenance.paymentMethod} Payment Method`}
                      >
                        <img
                          src={
                            maintenance.paymentMethod === "Online"
                              ? "/assets/wallet-2.svg"
                              : "/assets/moneys.svg"
                          }
                          alt={
                            maintenance.paymentMethod === "Online"
                              ? "Online Payment Icon"
                              : "Cash Payment Icon"
                          }
                          className="h-5 w-5 mr-2"
                        />
                        {maintenance.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-gray-200 hover:bg-gray-300 rounded-full"
                        onClick={() => {
                          setShowMaintenancePopup(true);
                          setSelectedMaintenance(maintenance);
                        }}
                      >
                        <span className="material-icons">
                          <img src="/assets/blueeye.svg" alt="Action Icon" />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-gray-500 select-none">
                <td className="text-center py-4 leading-[50vh]" colSpan="100%">
                  No Data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showMaintenancePopup && (
        <ViewMaintenanceDetails
          onClose={() => setShowMaintenancePopup(false)}
          maintenance={selectedMaintenance}
        />
      )}
    </>
  );
};

export default ViewMaintenance;
