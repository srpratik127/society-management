import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ViewMaintenanceInvoice from "../models/ViewCommunitiesDiscussion";
import { useSelector } from "react-redux";

const ViewInvoice = () => {
  const [doneMaintenance, setDoneMaintenance] = useState([]);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchDoneMaintenance = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/done/${user?._id}`
        );
        setDoneMaintenance(response?.data?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    fetchDoneMaintenance();
  }, []);

  const handleOpenInvoice = (invoice, member) => {
    setSelectedInvoice({
      ...member,
      amount: invoice.amount,
      penaltyAmount: invoice.penaltyAmount,
      penaltyDay: invoice.penaltyDay,
      updatedAt: invoice.updatedAt,
      dueDate: invoice.dueDate,
    });
    setIsInvoiceOpen(true);
  };

  return (
    <div className="bg-blue-50 m-5 rounded-lg">
      <div className="w-full bg-white rounded-lg p-4">
        <div className="flex justify-between items-center pb-4  w-full">
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
              <tr className="bg-blue-50 ">
                <th className="py-2 px-4 border-b text-left text-nowrap font-semibold">
                  Invoice ID
                </th>
                <th className="py-2 px-4 border-b text-left text-nowrap font-semibold">
                  Due Date
                </th>
                <th className="py-2 px-4 border-b text-left text-nowrap font-semibold">
                  Payment Date
                </th>

                <th className="py-2 px-4 border-b text-nowrap font-semibold">
                  Maintenance Amount
                </th>
                <th className="py-2 px-4 border-b text-nowrap font-semibold">
                  Penalty Amount
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {doneMaintenance.map((invoice) =>
                invoice.member.map((member, index) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      {member._id.substring(0, 8)}
                    </td>
                    <td className="py-2 px-4 border-b capitalize">
                      {new Date(invoice.dueDate).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(invoice.updatedAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-2 px-4 border-b text-center text-[#39973D]">
                      ₹ {invoice.amount}
                    </td>
                    <td className="py-2 px-4 border-b text-center text-red-500">
                      ₹ {invoice.penaltyAmount}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleOpenInvoice(invoice, member)}
                      >
                        <img
                          src="/assets/show.svg"
                          alt="Show Icon"
                          className="w-8 h-8 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
