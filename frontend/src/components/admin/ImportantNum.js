import React, { useState } from "react";
import { ImportantNumbers } from "../../data/admindashbord";
import ImportantNumber from "../models/ImportantNumber";
import DeleteModel from "../models/DeleteModel";

export const ImportantNum = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = (number) => {
    setSelectedNumber(number);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setSelectedNumber(null);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center text-xl font-semibold bg-whitep pb-1 rounded-lg">
        <h1>Important Numbers</h1>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 p-2 px-3 rounded-xl text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
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
        {ImportantNumbers.map((importantNumber, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border rounded-lg mb-2 border-gray-200"
          >
            <div className="space-y-1">
              <span className="block">
                <span>Name:</span>{" "}
                <span className="text-[#A7A7A7]">{importantNumber.Name}</span>
              </span>
              <span className="block">
                <span>Ph Number:</span>{" "}
                <span className="text-[#A7A7A7]">
                  +91 {importantNumber.PhNumber}
                </span>
              </span>
              <span className="block">
                <span>Work:</span>{" "}
                <span className="text-[#A7A7A7]">{importantNumber.Work}</span>
              </span>
            </div>
            <div className="flex space-x-2 items-center">
              <img
                onClick={() => setOpenDelete(true)}
                src="/assets/delete.svg"
                alt="Delete Icon"
                className="h-10 w-10 cursor-pointer"
              />
              <img
                src="/assets/edit.svg"
                alt="Edit Icon"
                className="h-10 w-10 cursor-pointer"
                onClick={() => handleEdit(importantNumber)}
              />
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <ImportantNumber
          closePopup={() => setIsOpen(false)}
          initialData={selectedNumber}
        />
      )}

      {openDelete && (
        <DeleteModel
          closePopup={() => setOpenDelete(false)}
        />
      )}
    </>
  );
};

export default ImportantNum;
