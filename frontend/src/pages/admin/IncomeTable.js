import React from "react";
import { maintenanceData } from "../../data/maintenanceData";

const IncomeTable = () => {
  return (
    <div className="bg-blue-50 min-h-[100px] p-6 overflow-y-hidden">

      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl">
        <div className="flex space-x-4">
          <div className="bg-white shadow rounded-lg p-4 w-[230px] flex flex-col justify-center">
            <div className="text-gray-500">Maintenance Amount</div>
            <div className="text-green-500 font-bold text-xl">₹ 0</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 w-[230px] flex flex-col justify-center">
            <div className="text-gray-500">Penalty Amount</div>
            <div className="text-red-500 font-bold text-xl">₹ 0</div>
          </div>
        </div>




        <div className="flex">
          <button className="text-white font-bold py-2 px-8 rounded-lg h-full" style={{
            background: "linear-gradient(to right, #FE512E, #F09619)",
          }}>
            Set Maintenance
          </button>
        </div>
      </div>

      <div className="flex border-b mb-6">
        <button className="py-2 px-4 text-white font-bold rounded-tl-lg rounded-tr-lg" style={{
          background: "linear-gradient(to right, #FE512E, #F09619)",
        }}>
          Maintenance
        </button>
        <button className="py-2 px-4 text-gray-500 border-b-2">Other Income</button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-y-auto" style={{ maxHeight: "60vh" }}>
        <table className="w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2 text-center">Unit Number</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2 text-center">Penalty</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceData.map((maintenance, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center space-x-3">
                  <img className="w-10 h-10 rounded-full" src={maintenance.image} alt="Profile" />
                  <span>{maintenance.name}</span>
                </td>
                <td className="text-center">
                  <span className="p-2 text-[#5678E9] bg-[#F6F8FB] font-semibold py-1 rounded-full">{maintenance.unit}</span>
                  <span>{maintenance.unitnumber}</span>
                </td>
                <td className="px-4 py-2">{maintenance.date}</td>

                <td className="text-center">
                  <span
                    className={`flex items-center justify-center ${maintenance.status === "Tenant"
                      ? "text-[#EC4899] font-semibold py-2 px-4 rounded-full bg-[#ECFFFF]"
                      : "text-[#4F46E5] font-semibold py-2 px-4 rounded-full bg-[#FFF6FF]"
                      }`}
                  >
                    <img
                      src={
                        maintenance.status === "Owner"
                          ? "/assets/owner.svg"
                          : "/assets/user.svg"
                      }
                      alt={maintenance.status === "Owner" ? "Owner Icon" : "User Icon"}
                      className="h-5 w-5 mr-2"
                    />
                    {maintenance.status}
                  </span>

                </td>

                <td className="px-4 py-2">{maintenance.phone}</td>
                <td className="px-4 py-2 text-green-600">₹ {maintenance.amount}</td>

                <td className="px-4 py-2 text-center">
                  <span className={`flex items-center justify-center ${maintenance.penalty === "--"
                    ? "text-[#000000] font-semibold py-2 px-4 rounded-full bg-[#F6F8FB]"
                    : "text-[#FFFFFF] font-semibold py-2 px-4 rounded-full bg-[#E74C3C]"
                    }`}>

                    {maintenance.penalty}
                  </span>
                </td>
                <td className="px-4 text-center ">
                  <span
                    className={`px-2 py-2 rounded-full flex items-center justify-center ${maintenance.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                      }`}
                    aria-label={`${maintenance.paymentStatus} Status`}
                  >
                    <img
                      src={
                        maintenance.paymentStatus === "Pending"
                          ? "/assets/timer.svg"
                          : "/assets/tickmark.svg"
                      }
                      alt={maintenance.paymentStatus === "Pending" ? "Pending Icon" : "Done Icon"}
                      className="h-5 w-5 mr-2"
                    />
                    {maintenance.paymentStatus}
                  </span>
                </td>


                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-2 flex items-center justify-center rounded-full ${maintenance.paymentMethod === "Online"
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
                      alt={maintenance.paymentMethod === "Online" ? "Online Payment Icon" : "Cash Payment Icon"}
                      className="h-5 w-5 mr-2"
                    />
                    {maintenance.paymentMethod}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full">
                    <span className="material-icons"><img src="/assets/blueeye.svg" alt="Action Icon" /></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeTable;
