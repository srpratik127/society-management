import { Popover } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import EditOtherIncome from "../models/EditOtherIncome";
import CreateOtherIncome from "../models/CreateOtherIncome";
import axios from "axios";
import DeleteModel from "../models/DeleteModel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OtherIncome = () => {
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [openDeleteIncome, setOpenDeleteIncome] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [otherIncomeData, setOtherIncomeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const viewOtherIncome = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/income`
        );
        setOtherIncomeData(response?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    viewOtherIncome();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/income/${selectedItem._id}`
      );
      setOtherIncomeData((prev) =>
        prev.filter((number) => number._id !== selectedItem._id)
      );
      setSelectedItem(null);
      toast.success("Income delete successful!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setOpenDeleteIncome(false);
  };

  const handleClosePopup = () => {
    setCreatePopupOpen(false);
    setIsEditPopupVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className="bg-[#ffffff] border rounded-b-xl p-3 max-w-full mx-auto">
      <div className="mt-3 flex flex-col sm:flex-row justify-between align-center px-3">
        <h2 className="text-2xl font-semibold">Other Income</h2>
        <button
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none mt-2 sm:mt-0"
          onClick={() => setCreatePopupOpen(true)}
        >
          Create Other Income
        </button>
      </div>
      {otherIncomeData.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 rounded-lg">
        {otherIncomeData.map((item, index) => (
          <div key={index} className="border-2 border-[#5678E9] rounded-xl">
            <div className="flex mb-2 py-3 w-full rounded-t-lg px-2 bg-[#5678E9] justify-between">
              <h3 className="text-lg text-white">{item.title}</h3>
              <Popover className="relative">
                <Popover.Button>
                  <img src="/assets/3dots.svg" alt="options" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditPopupVisible(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        navigate("/admin/maintenance-details", {
                          state: { otherIncome: item },
                        });
                      }}
                    >
                      View
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setOpenDeleteIncome(true);
                        setSelectedItem(item);
                      }}
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
              <span className="font-medium">{item.members?.length || "0"}</span>
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
              <span className="font-medium">
                {new Date(item.dueDate).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between px-3 py-1">
              <span className="text-sm mt-2">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <p className="text-center text-gray-400 select-none">No Other Income Found!</p>
      )}
      {isCreatePopupOpen && (
        <CreateOtherIncome
          onClose={handleClosePopup}
          setOtherIncomeData={setOtherIncomeData}
        />
      )}
      {isEditPopupVisible && (
        <EditOtherIncome
          onClose={handleClosePopup}
          selectedItem={selectedItem}
          setIncomeData={setOtherIncomeData}
        />
      )}
      {openDeleteIncome && (
        <DeleteModel
          closePopup={() => setOpenDeleteIncome(false)}
          onDelete={handleDelete}
          message={{
            title: `Delete ${selectedItem.title}?`,
            sms: "Are you sure you want to delete this?",
          }}
        />
      )}
    </div>
  );
};

export default OtherIncome;
