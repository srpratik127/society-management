import React from 'react';
import { securityProtocolsData } from '../../data/residentsecurityprotocols';

const ResidentSecurityProtocols = () => {
  return (
    <div className="p-4 m-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Security Protocols</h2>
      {/* Ensure table remains scrollable on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left text-nowrap">Title</th>
              <th className="py-3 px-6 text-left text-nowrap">Description</th>
              <th className="py-3 px-6 text-center text-nowrap">Date</th>
              <th className="py-3 px-6 text-center text-nowrap">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {securityProtocolsData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left text-nowrap">{item.title}</td>
                <td className="py-3 px-6 text-left text-nowrap">{item.description}</td>
                <td className="py-3 px-6 text-center text-nowrap">{item.date}</td>
                <td className="py-3 px-6 text-center">
                  <div className="bg-[#F6F8FB] py-2 px-4 rounded-full inline-block text-nowrap">
                    {item.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentSecurityProtocols;
