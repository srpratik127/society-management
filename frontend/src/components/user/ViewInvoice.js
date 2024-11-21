import React from 'react';

const ViewInvoice = () => {
  const data = [
    {
      invoiceId: 152563,
      ownerName: 'Terry Rhiel Madsen',
      billDate: '10/02/2024',
      paymentDate: '10/02/2024',
      phoneNumber: 9764816457,
      email: 'FrancesLHarris@rhyta.com',
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
        invoiceId: 152563,
        ownerName: 'Terry Rhiel Madsen',
        billDate: '10/02/2024',
        paymentDate: '10/02/2024',
        phoneNumber: 9764816457,
        email: 'FrancesLHarris@rhyta.com',
        maintenanceAmount: 1500,
        pendingAmount: 2500,
      },
      {
        invoiceId: 152563,
        ownerName: 'Terry Rhiel Madsen',
        billDate: '10/02/2024',
        paymentDate: '10/02/2024',
        phoneNumber: 9764816457,
        email: 'FrancesLHarris@rhyta.com',
        maintenanceAmount: 1500,
        pendingAmount: 2500,
      },
      {
        invoiceId: 152563,
        ownerName: 'Terry Rhiel Madsen',
        billDate: '10/02/2024',
        paymentDate: '10/02/2024',
        phoneNumber: 9764816457,
        email: 'FrancesLHarris@rhyta.com',
        maintenanceAmount: 1500,
        pendingAmount: 2500,
      },
      {
        invoiceId: 152563,
        ownerName: 'Terry Rhiel Madsen',
        billDate: '10/02/2024',
        paymentDate: '10/02/2024',
        phoneNumber: 9764816457,
        email: 'FrancesLHarris@rhyta.com',
        maintenanceAmount: 1500,
        pendingAmount: 2500,
      },
      {
        invoiceId: 152563,
        ownerName: 'Terry Rhiel Madsen',
        billDate: '10/02/2024',
        paymentDate: '10/02/2024',
        phoneNumber: 9764816457,
        email: 'FrancesLHarris@rhyta.com',
        maintenanceAmount: 1500,
        pendingAmount: 2500,
      },
      {
        invoiceId: 152563,
        ownerName: 'Terry Rhiel Madsen',
        billDate: '10/02/2024',
        paymentDate: '10/02/2024',
        phoneNumber: 9764816457,
        email: 'FrancesLHarris@rhyta.com',
        maintenanceAmount: 1500,
        pendingAmount: 2500,
      },
      
  ];

  return (
    <div className='bg-blue-50 py-4 rounded-lg'>
      <div className="container mx-auto bg-white p-4 h-full">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-semibold">Maintenance Invoices</h1>
          <div className="relative">
            <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
              <option>Year</option>
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
        </div>
        
        <table className="w-full h-full border-gray-300">
          <thead className='items-center font-poppins px-0 rounded-lg'>
            <tr>
              <th className="py-2 px-4 border-b bg-blue-50">Invoice ID</th>
              <th className="py-2 px-4 border-b bg-blue-50">Owner Name</th>
              <th className="py-2 px-4 border-b bg-blue-50">Bill Date</th>
              <th className="py-2 px-4 border-b bg-blue-50">Payment Date</th>
              <th className="py-2 px-4 border-b bg-blue-50">Phone Number</th>
              <th className="py-2 px-4 border-b bg-blue-50">Email</th>
              <th className="py-2 px-4 border-b bg-blue-50">Maintenance Amount</th>
              <th className="py-2 px-4 border-b bg-blue-50">Pending Amount</th>
              <th className="py-2 px-4 border-b bg-blue-50">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td className="py-2 px-4 border-b text-center font-poppins">{invoice.invoiceId}</td>
                <td className="py-2 px-4 border-b text-center font-poppins">{invoice.ownerName}</td>
                <td className="py-2 px-4 border-b text-center font-poppins">{invoice.billDate}</td>
                <td className="py-4 px-4 border-b text-center font-poppins">{invoice.paymentDate}</td>
                <td className="py-4 px-4 border-b text-center font-poppins">{invoice.phoneNumber}</td>
                <td className="py-4 px-4 border-b text-center font-poppins">{invoice.email}</td>
                <td className="py-4 px-4 border-b text-center font-poppins text-green-500"> ₹ {invoice.maintenanceAmount}</td>
                <td className="py-4 px-4 border-b text-center font-poppins text-red-500"> ₹{invoice.pendingAmount}</td>
                <td className='items-center text-center'>
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
