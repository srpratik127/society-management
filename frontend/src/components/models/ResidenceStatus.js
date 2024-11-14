import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModel from "./DeleteModel";

const ResidenceStatus = ({ resident, onClose, setOpenConform }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    resident.residenceStatus
  );
  const [isChecked, setIsChecked] = useState(true);
  const [unitPopup, setUnitPopup] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    if (selectedStatus === "Occupied") {
      onClose();
      navigate("/admin/edit-resident", { state: { resident } });
    }
    if (selectedStatus === "Vacate") {
      setUnitPopup(true);
    }
  };

  const StatusOption = ({ status }) => (
    <label
      className={`flex items-center gap-3 justify-center cursor-pointer w-full ${
        selectedStatus === status
          ? "text-orange-600 border-orange-500"
          : "text-gray-500 border-gray"
      } border rounded-md`}
      onClick={() => setSelectedStatus(status)}
    >
      <img
        src={`/assets/${
          selectedStatus === status ? "fill-redio" : "unfill-redio"
        }.svg`}
        alt={`${status} status icon`}
      />
      <span className="py-2 rounded-md">{status}</span>
    </label>
  );

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-xl p-6 w-[390px]">
          <h1 className="text-xl font-semibold mb-4">Residence Status</h1>
          <div className="mb-4">
            {unitPopup ? (
              <div className="flex gap-3">
                <div className="w-full">
                  <label>Wing*</label>
                  <select className="w-full px-4 py-2 border rounded-md outline-none">
                    <option>{resident.unit}</option>
                  </select>
                </div>
                <div className="w-full">
                  <label>Unit*</label>
                  <select className="w-full px-4 py-2 border rounded-md outline-none">
                    <option>{resident.wing}</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <StatusOption status="Occupied" />
                <StatusOption status="Vacate" />
              </div>
            )}
          </div>
          {!unitPopup && (
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agreement"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreement" className="text-gray-500 text-sm">
                By submitting, you agree to select {selectedStatus}
              </label>
            </div>
          )}
          <div className="flex gap-3">
            <button
              className="px-12 py-2 border rounded-md w-full text-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            {!unitPopup ? (
              <button
                className={`px-12 py-2 rounded-md w-full text-white ${
                  isChecked
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isChecked}
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className={`px-12 py-2 rounded-md w-full text-white ${
                  isChecked
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={() => {
                  setOpenConform(true);
                  onClose();
                }}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResidenceStatus;
