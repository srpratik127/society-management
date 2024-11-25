import React from "react";

const ViewInvoice = () => {
  const data = [
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      invoiceId: 152563,
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: 9764816457,
      email: "FrancesLHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
  ];

  return (
    <div className="bg-blue-50 m-5 rounded-lg ">
      <div className="container bg-white p-4 overflow-auto">
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

        <table className="border-gray-300">
          <thead className="items-center font-poppins px-0 rounded-lg">
            <tr className="bg-blue-50">
              <th className="py-2 px-4 border-b ">Invoice ID</th>
              <th className="py-2 px-4 border-b">Owner Name</th>
              <th className="py-2 px-4 border-b">Bill Date</th>
              <th className="py-2 px-4 border-b">Payment Date</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Maintenance Amount</th>
              <th className="py-2 px-4 border-b">Pending Amount</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td className="py-2 px-4 border-b text-center font-poppins">
                  {invoice.invoiceId}
                </td>
                <td className="py-2 px-4 border-b text-center font-poppins">
                  {invoice.ownerName}
                </td>
                <td className="py-2 px-4 border-b text-center font-poppins">
                  {invoice.billDate}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins">
                  {invoice.paymentDate}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins">
                  {invoice.phoneNumber}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins">
                  {invoice.email}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins text-green-500">
                  {" "}
                  ₹ {invoice.maintenanceAmount}
                </td>
                <td className="py-4 px-4 border-b text-center font-poppins text-red-500">
                  {" "}
                  ₹{invoice.pendingAmount}
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
