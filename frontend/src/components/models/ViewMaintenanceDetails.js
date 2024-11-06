import React from 'react'

const ViewMaintenanceDetails = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => console.log("Close Popup")}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 border-b pb-2">View Maintenance Details</h2>

        <div className="flex items-center mb-4">
          <img
            src="/assets/Avatar.png"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-semibold">Cody Fisher</h3>
            <p className="text-gray-500 text-sm">Feb 10, 2024</p>
          </div>
        </div>

        <div className="flex justify-between mb-4 text-gray-700">
          <div className="flex flex-col border-r pr-4">
            <span className="text-xs text-gray-500">Wing</span>
            <span className="font-semibold">A</span>
          </div>
          <div className="flex flex-col border-r pr-4">
            <span className="text-xs text-gray-500">Unit</span>
            <span className="font-semibold">1001</span>
          </div>
          <div className="flex flex-col border-r pr-4">
            <span className="text-xs text-gray-500">Status</span>
            <span className="text-sm font-semibold bg-purple-100 text-purple-600 rounded px-2">Owner</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Amount</span>
            <span className="font-semibold text-green-600">₹ 1000</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col border-r pr-4">
            <span className="text-xs text-gray-500">Penalty</span>
            <span className="font-semibold">--</span>
          </div>
          <div className="flex flex-col border-r pr-4">
            <span className="text-xs text-gray-500">Status</span>
            <span className="text-sm font-semibold bg-yellow-100 text-yellow-600 rounded px-2">Pending</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Payment</span>
            <span className="text-sm font-semibold bg-gray-100 text-gray-600 rounded px-2">Cash</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewMaintenanceDetails
