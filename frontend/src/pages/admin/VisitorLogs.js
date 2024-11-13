import React from 'react';
import securityManagement from '../../data/VisitorLogs'
const VisitorLogs = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Visitor Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-6 text-gray-700 text-center">Visitor Name</th>
              <th className="py-3 px-6 text-gray-700 text-center">Phone Number</th>
              <th className="py-3 px-6 text-gray-700 text-center">Date</th>
              <th className="py-3 px-6 text-gray-700 text-center">Unit Number</th>
              <th className="py-3 px-6 text-gray-700 text-center">Time</th>
            </tr>
          </thead>
          <tbody>
            {securityManagement.map((securityManagement, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-6 flex items-center text-center min-w-[200px]">
                  <img
                    src="/assets/Avatar.png"
                    alt="Visitor"
                    className="rounded-full mr-3"
                  />
                  <span>{securityManagement.name}</span>
                </td>
                <td className="py-3 px-6 text-center min-w-[200px]">{securityManagement.phone}</td>
                <td className="py-3 px-6 text-center min-w-[200px]">{securityManagement.date}</td>
                <td className="py-3 px-6 text-center min-w-[200px]">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                    {securityManagement.block}
                  </span>
                  <span className="ml-2">{securityManagement.unit}</span>
                </td>
                <td className="py-3 px-6 text-center min-w-[200px]">{securityManagement.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorLogs;