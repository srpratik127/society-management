import { Popover } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import EditOtherIncome from "../models/EditOtherIncome";
import CreateOtherIncome from "../models/CreateOtherIncome";
import axios from "axios";

const OtherIncome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [otherIncomeData, setOtherIncomeData] = useState([]);

  useEffect(() => {
    const viewOtherIncome = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/income`
        );
        setOtherIncomeData(response?.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    viewOtherIncome();
  }, []);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditPopupVisible(true);
  };

  const handleCreateOtherIncome = () => {
    setCreatePopupOpen(true);
  };
  const handleClosePopup = () => {
    setCreatePopupOpen(false);
    setIsEditPopupVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className="bg-[#ffffff] border rounded-b-xl p-3">
      <div className="mt-3 flex justify-between align-center px-3">
        <h2 className="text-2xl font-bold">Other Income</h2>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
          onClick={handleCreateOtherIncome}
        >
          Create Other Income
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 rounded-lg">
        {otherIncomeData.map((item, index) => (
          <div key={index} className="border-2 border-[#5678E9] rounded-xl">
            <div className="flex mb-2 py-3 w-full rounded-t-lg px-2 bg-[#5678E9] justify-between">
              <h3 className="text-lg text-white">{item.title}</h3>
              <Popover className="relative">
                <Popover.Button>
                  <img src="/assets/3dots.svg" alt="options" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setSelectedOption("View")}
                    >
                      View
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setSelectedOption("Delete")}
                    >
                      Delete
                    </button>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
            <div className="flex justify-between px-3 py-1">
              <span className="text-sm text-gray-600">Amount Per Member:</span>
              <span className="font-medium">₹{item.amount}</span>
            </div>
            <div className="flex justify-between px-3 py-1">
              <span className="text-sm text-gray-600">Total Members:</span>
              <span className="font-medium">{item.totalMembers}</span>
            </div>
            <div className="flex justify-between px-3 py-1">
              <span className="text-sm text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(item.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between px-3 py-1">
              <span className="text-sm text-gray-600">Due Date:</span>
              <span className="font-medium">{new Date(item.dueDate).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</span>
            </div>
            <div className="flex justify-between px-3 py-1">
              <span className="text-sm text-gray-600 mt-2">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
      {isCreatePopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <CreateOtherIncome onClose={handleClosePopup} />
        </div>
      )}
      {isEditPopupVisible && <EditOtherIncome onClose={handleClosePopup} />}
    </div>
  );
};

export default OtherIncome;
