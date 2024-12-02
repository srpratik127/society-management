import React, { useEffect, useState } from "react";
import ImportantNumber from "../models/ImportantNumber";
import DeleteModel from "../models/DeleteModel";
import axios from "axios";
import toast from "react-hot-toast";

export const ImportantNum = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [importantNumbers, setImportantNumbers] = useState([]);
  const [numberToDelete, setNumberToDelete] = useState(null);

  useEffect(() => {
    const fetchImportantNumbers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/numbers`
        );
        setImportantNumbers(response?.data?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchImportantNumbers();
  }, []);

  const handleEdit = (number) => {
    setSelectedNumber(number);
    setIsOpen(true);
  };
  const handleAdd = () => {
    setSelectedNumber(null);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/numbers/${numberToDelete}`,
        {
          withCredentials: true,
        }
      );
      setImportantNumbers((prev) =>
        prev.filter((number) => number._id !== numberToDelete)
      );
      toast.success("Numbers delete successful!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setOpenDelete(false);
  };

  return (
    <>
      <div className="flex justify-between items-center text-xl font-semibold bg-white pb-1 rounded-lg">
        <h1 className="">Important Numbers</h1>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 p-1 px-3 rounded-lg text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
        >
          <img
            src="/assets/add-square.svg"
            alt="Add Icon"
            className="h-5 w-5"
          />
          <span>Add</span>
        </button>
      </div>

      <div className="max-h-[350px] overflow-y-auto">
        {importantNumbers.length > 0 ? (
          importantNumbers.map((importantNumber, index) => (
            <div
              key={index}
              className="flex justify-between flex-row lg:flex-col xl:flex-row  xxl:flex-row  items-center p-4 border rounded-lg mb-2 border-gray-200"
            >
              <div className="space-y-1">
                <span className="block">
                  <span>Name:</span>{" "}
                  <span className="text-[#A7A7A7] capitalize inline xl:inline lg:block">
                    {importantNumber.fullName}
                  </span>
                </span>
                <span className="block">
                  <span>Ph Number:</span>{" "}
                  <span className="text-[#A7A7A7] inline xl:inline lg:block">
                    +91 {importantNumber.phoneNumber}
                  </span>
                </span>
                <span className="block">
                  <span>Work:</span>{" "}
                  <span className="text-[#A7A7A7] inline xl:inline lg:block">{importantNumber.work}</span>
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <img
                  src="/assets/delete.svg"
                  alt="Delete"
                  className="cursor-pointer"
                  onClick={() => {
                    setNumberToDelete(importantNumber._id);
                    setOpenDelete(true);
                  }}
                />
                <img
                  src="/assets/edit.svg"
                  alt="Edit Icon"
                  className="cursor-pointer"
                  onClick={() => handleEdit(importantNumber)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center leading-[350px] select-none">
            No Numbers found.
          </p>
        )}
      </div>

      {isOpen && (
        <ImportantNumber
          closePopup={() => setIsOpen(false)}
          initialData={selectedNumber}
          setImportantNumbers={setImportantNumbers}
        />
      )}

      {openDelete && (
        <DeleteModel
          closePopup={() => setOpenDelete(false)}
          onDelete={handleDelete}
          message={{
            title: "Delete Number?",
            sms: "Are you sure you want to delete this number?",
          }}
        />
      )}
    </>
  );
};

export default ImportantNum;
