import React, { useState } from 'react';
import { ExpanceData } from '../../data/maintenanceData';
import AddExpensesDetails from '../../components/models/AddExpensesDetails';
import EditExpensesDetails from '../../components/models/EditExpensesDetails';
import ViewExpense from '../../components/models/ViewExpense';

const ExpensesTable = () => {
  const [showAddExpenses, setShowAddExpenses] = useState(false);
  const [showEditExpenses, setShowEditExpenses] = useState(false);
  const [showViewExpenses, setShowViewExpenses] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openAddPopup = () => {
    setShowAddExpenses(true);
  };

  const openEditPopup = () => {
    setShowEditExpenses(true);
  };

  const openViewPopup = (expense) => {
    setSelectedExpense(expense);
    setShowViewExpenses(true);
  };

  const closePopup = () => {
    setShowAddExpenses(false);
    setShowEditExpenses(false);
    setShowViewExpenses(false);
    setSelectedExpense(null);
  };

  return (
    <div className="p-4 max-w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Add Expenses Details</h2>
        <button onClick={openAddPopup} className="bg-orange-500 text-white py-2 px-4 rounded">
          Add New Expenses Details
        </button>
        {showAddExpenses && <AddExpensesDetails onClose={closePopup} />}
      </div>
      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-gray-600 font-semibold">Title</th>
              <th className="p-3 text-gray-600 font-semibold">Description</th>
              <th className="p-3 text-gray-600 font-semibold text-center">Date</th>
              <th className="p-3 text-gray-600 font-semibold text-center">Amount</th>
              <th className="p-3 text-gray-600 font-semibold text-center">Bill Format</th>
              <th className="p-3 text-gray-600 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ExpanceData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-3">{item.title}</td>
                <td className="px-3">{item.Description}</td>
                <td className="px-3 text-center">{item.date}</td>
                <td className="px-3 text-green-500 text-center">₹ {item.amount}</td>
                <td className="px-3 text-center">
                  <span className="px-2 py-2 rounded flex items-center justify-center">
                    {item.bill_format === "PDF" ? (
                      <img src="/assets/pdf.svg" alt="" className="bg-blue-100 p-2 h-8 w-8 rounded-lg mr-1" />
                    ) : (
                      <img src="/assets/gallery.svg" alt="" className="bg-blue-100 h-8 w-8 rounded-lg p-2 mr-1" />
                    )}
                    {item.bill_format}
                  </span>
                </td>
                <td className="px-3 flex justify-center space-x-2">
                  <button onClick={openEditPopup}>
                    <img src='/assets/edit.svg' alt='' className="h-8 w-8 rounded" />
                  </button>
                  {showEditExpenses && <EditExpensesDetails onClose={closePopup} />}

                  <button onClick={() => openViewPopup(item)}>
                    <img src='/assets/blueeye.svg' alt='' className="h-8 w-8 rounded" />
                  </button>
                  {showViewExpenses && <ViewExpense onClose={closePopup} expense={selectedExpense} />}
                  <button>
                    <img src='/assets/delete.svg' alt='' className="h-8 w-8 rounded" />
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

export default ExpensesTable;
