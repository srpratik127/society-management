import React from 'react';
import { useLocation } from 'react-router-dom';

const MaintenanceViewDetails = () => {
    const location = useLocation();
    const otherIncome = location.state?.otherIncome;

    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow m-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {otherIncome?.title}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">
                  Unit Number
                </th>
                <th className="py-3 px-4 text-center font-semibold text-gray-600">
                  Payment Date
                </th>
                <th className="py-3 px-4 text-center font-semibold text-gray-600">
                  Tenant/Owner Status
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-center">
                  Phone Number
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-center">
                  Amount
                </th>
                <th className="py-3 px-4 text-center font-semibold text-gray-600">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {otherIncome?.members?.map((member, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">
                    <span className="text-blue-600 bg-[#F6F8FB] rounded-full px-2 py-1 mr-2">
                      {member?.user?.wing}
                    </span>
                    {member?.user?.unit}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center">
                    {new Date(member.paymentDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span
                        className={`flex items-center px-3 py-1 rounded-full text-sm ${
                          member?.user?.role === "owner"
                            ? "bg-[#F1F0FF] text-[#4F46E5]"
                            : "bg-[#FFF1F8] text-[#EC4899]"
                        }`}
                      >
                        <img
                          src={
                            member?.user?.role === "owner"
                              ? "/assets/owner.svg"
                              : "/assets/user.svg"
                          }
                          alt={member?.user?.role}
                          className="h-5 w-5 mr-2"
                        />
                        {member?.user?.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center">
                    +91 {member?.user?.phone}
                  </td>
                  <td className="py-3 px-4 text-green-600 font-medium text-center">
                    ₹ {member.payAmount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`flex items-center justify-center p-2 rounded-full text-sm ${
                        member.paymentMethod === "Cash"
                          ? "bg-[#2022240D] text-[#202224]"
                          : "bg-[#5678E91A] text-[#5678E9]"
                      }`}
                    >
                      <img
                        src={
                          member.paymentMethod === "Cash"
                            ? "/assets/moneys.svg"
                            : "/assets/wallet-2.svg"
                        }
                        alt={member.paymentMethod}
                        className="h-5 w-5 mr-2"
                      />
                      {member.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MaintenanceViewDetails;