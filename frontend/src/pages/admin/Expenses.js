import React, { useEffect, useState } from "react";
import AddExpensesDetails from "../../components/models/AddExpensesDetails";
import axios from "axios";
import ViewExpense from "../../components/models/ViewExpense";
import EditExpensesDetails from "../../components/models/EditExpensesDetails";
import DeleteModel from "../../components/models/DeleteModel";
import toast from "react-hot-toast";

const Expenses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupView, setIsPopupView] = useState(false);
  const [isPopupEdit, setIsPopupEdit] = useState(false);
  const [isPopupDelete, setIsPopupDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [expansesData, setExpansesData] = useState([]);

  useEffect(() => {
    const fetchExpensesList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/expenses`
        );
        setExpansesData(response?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    fetchExpensesList();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/expenses/${selectedItem._id}`
      );
      setExpansesData((prev) =>
        prev.filter((complain) => complain._id !== selectedItem._id)
      );
      setIsPopupDelete(false);
      toast.success("Expenses Deleted successful!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="m-5 p-5 max-w-full bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <h2 className="text-2xl font-semibold w-full sm:w-auto">
            Add Expenses Details
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded mt-2 sm:mt-0"
          >
            Add New Expenses Details
          </button>
        </div>
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-gray-600 text-nowrap">Title</th>
                <th className="p-3 text-gray-600 text-nowrap">Description</th>
                <th className="p-3 text-gray-600 text-nowrap text-center">
                  Date
                </th>
                <th className="p-3 text-gray-600 text-nowrap text-center">
                  Amount
                </th>
                <th className="p-3 text-gray-600 text-nowrap text-center">
                  Bill Format
                </th>
                <th className="p-3 text-gray-600 text-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expansesData.length > 0 ? (
                expansesData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-3">{item.title}</td>
                    <td className="px-3">{item.description}</td>
                    <td className="px-3 text-center">
                      {new Date(item.updatedAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 text-green-500 text-center">
                      ₹ {item.amount}
                    </td>
                    <td className="px-3 text-center">
                      <span className="flex items-center justify-center px-2 py-2 rounded">
                        {item.bill.endsWith(".pdf") ? (
                          <img
                            src="/assets/pdf.svg"
                            alt="PDF Icon"
                            className="bg-blue-100 p-2 h-8 w-8 rounded-lg mr-1"
                          />
                        ) : (
                          <img
                            src="/assets/gallery.svg"
                            alt="Image Icon"
                            className="bg-blue-100 h-8 w-8 rounded-lg p-2 mr-1"
                          />
                        )}
                        {item.bill.endsWith(".pdf") ? "PDF" : "PNG"}
                      </span>
                    </td>
                    <td className="px-3 flex justify-center space-x-2 mt-2">
                      <img
                        src="/assets/edit.svg"
                        alt="Edit"
                        className="h-8 w-8 rounded cursor-pointer"
                        onClick={() => {
                          setIsPopupEdit(true);
                          setSelectedItem(item);
                        }}
                      />
                      <img
                        src="/assets/blueeye.svg"
                        alt="View"
                        className="h-8 w-8 rounded cursor-pointer"
                        onClick={() => {
                          setIsPopupView(true);
                          setSelectedItem(item);
                        }}
                      />
                      <img
                        src="/assets/delete.svg"
                        alt="Delete"
                        className="h-8 w-8 rounded cursor-pointer"
                        onClick={() => {
                          setIsPopupDelete(true);
                          setSelectedItem(item);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-gray-500 select-none">
                  <td
                    className="text-center py-4 leading-[74vh]"
                    colSpan="100%"
                  >
                    No Data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && (
        <AddExpensesDetails
          onClose={() => setIsPopupOpen(false)}
          setExpansesData={setExpansesData}
        />
      )}
      {isPopupView && (
        <ViewExpense
          onClose={() => setIsPopupView(false)}
          expense={selectedItem}
        />
      )}
      {isPopupEdit && (
        <EditExpensesDetails
          onClose={() => setIsPopupEdit(false)}
          expense={selectedItem}
          setExpansesData={setExpansesData}
        />
      )}
      {isPopupDelete && (
        <DeleteModel
          closePopup={() => setIsPopupDelete(false)}
          onDelete={handleDelete}
          message={{
            title: "Delete Expense?",
            sms: "Are you sure you want to delete this?",
          }}
        />
      )}
    </>
  );
};

export default Expenses;
