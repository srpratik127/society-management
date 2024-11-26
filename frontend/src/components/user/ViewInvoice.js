import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ViewInvoice = () => {
  const [doneMaintenance, setDoneMaintenance] = useState([]);

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

  return (
    <div className="bg-blue-50 m-5 rounded-lg ">
      <div className="w-full bg-white p-4 overflow-auto">
        <div className="flex justify-between items-center py-4 w-full">
          <h1 className="text-2xl font-semibold">Maintenance Invoices</h1>
          <div className="">
            <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
              <option>Year</option>
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
        </div>

        <table className="border-gray-300 w-full">
          <thead className="items-center font-poppins px-0 rounded-lg">
            <tr className="bg-blue-50">
              <th className="py-2 px-4 border-b ">Invoice ID</th>
              <th className="py-2 px-4 border-b">Owner Name</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Wing</th>
              <th className="py-2 px-4 border-b">Maintenance Amount</th>
              <th className="py-2 px-4 border-b">Penalty Day</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {doneMaintenance.map((invoice) => (
              <tr key={invoice._id}>
                <td className="py-2 px-4 border-b text-center font-poppins">
                  {invoice._id}
                </td>
                <td className="py-2 px-4 border-b text-center capitalize">
                  {invoice?.user?.fullName}
                </td>
                <td className="py-2 px-4 border-b text-center text-nowrap">
                  {invoice?.user?.phone}
                </td>
                <td className="py-4 px-4 border-b text-center capitalize">
                  {invoice?.user?.role}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins">
                  {invoice?.user?.email}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins">
                  {invoice?.user?.wing}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins text-green-500">
                  {" "}
                  ₹ {invoice.amount}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins text-red-500">
                  {new Date(invoice.penaltyDay).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="items-center text-center">
                  <button>
                    <img
                      src="/assets/showicon.svg"
                      alt="Show Icon"
                      className="py-6 cursor-pointer items-center"
                    />
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

export default ViewInvoice;
