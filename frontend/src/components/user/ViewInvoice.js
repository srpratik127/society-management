import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ViewMaintenanceInvoice from "../models/ViewCommunitiesDiscussion";

const ViewInvoice = () => {
  const [doneMaintenance, setDoneMaintenance] = useState([]);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null); 

  useEffect(() => {
    const fetchPendingMaintenance = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/done`
        );
        setDoneMaintenance(response?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPendingMaintenance();
  }, []);

  const handleOpenInvoice = (invoice) => {
    setSelectedInvoice(invoice); 
    setIsInvoiceOpen(true); 
  };

  return (
    <div className="bg-blue-50 m-5 rounded-lg">
      <div className="w-full bg-white p-4">
        <div className="flex justify-between items-center py-4 w-full">
          <h1 className="text-2xl font-semibold">Maintenance Invoices</h1>
          <div>
            <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
              <option>Year</option>
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="font-poppins">
              <tr className="bg-blue-50">
                <th className="py-2 px-4 border-b text-left text-nowrap">Invoice ID</th>
                <th className="py-2 px-4 border-b text-left text-nowrap">Owner Name</th>
                <th className="py-2 px-4 border-b text-left text-nowrap">Phone Number</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Wing</th>
                <th className="py-2 px-4 border-b text-left text-nowrap">Maintenance Amount</th>
                <th className="py-2 px-4 border-b text-left text-nowrap">Penalty Day</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {doneMaintenance.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{invoice._id}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {invoice?.user?.fullName}
                  </td>
                  <td className="py-2 px-4 border-b">{invoice?.user?.phone}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {invoice?.user?.role}
                  </td>
                  <td className="py-2 px-4 border-b truncate">
                    {invoice?.user?.email}
                  </td>
                  <td className="py-2 px-4 border-b ">{invoice?.user?.wing}</td>
                  <td className="py-2 px-4 border-b text-center text-[#39973D]">
                    ₹ {invoice.amount}
                  </td>
                  <td className="py-2 px-4 border-b text-red-500">
                    {new Date(invoice.penaltyDay).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button onClick={() => handleOpenInvoice(invoice)}>
                      <img
                        src="/assets/showicon.svg"
                        alt="Show Icon"
                        className="w-8 h-8 cursor-pointer"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isInvoiceOpen && (
        <ViewMaintenanceInvoice
          invoice={selectedInvoice} 
          onClose={() => setIsInvoiceOpen(false)} 
        />
      )}
    </div>
  );
};

export default ViewInvoice;
