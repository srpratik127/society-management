import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResidenceStatus = ({ resident, onClose }) => {
    const [selectedStatus, setSelectedStatus] = useState(resident.residenceStatus);
    const [isChecked, setIsChecked] = useState(true);
    const [unitPopup, setUnitPopup] = useState(false);

    const navigate = useNavigate();


    const handleSave = () => {
      onClose();
      if(selectedStatus==="Occupied"){
          navigate("/admin/edit-resident", { state: { resident } });
        }
        if(selectedStatus==="Vacate"){
          
        }
    };

  const StatusOption = ({ status }) => (
    <label
        className={`flex px-4 items-center space-x-2 cursor-pointer ${
            selectedStatus === status ? "text-orange-600 border-orange-500" : "text-gray-500 border-gray"
        } border rounded-md`}
        onClick={() => setSelectedStatus(status)}
    >
        <img
            src={`/assets/${selectedStatus === status ? "fill-redio" : "unfill-redio"}.svg`}
            alt={`${status} status icon`}
        />
        <span className="py-2 rounded-md">{status}</span>
    </label>
);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[390px] shadow-lg">
        <h1 className="text-xl font-semibold mb-4">Residence Status</h1>
        <div className="flex justify-around mb-4">
          <StatusOption status="Occupied" />
          <StatusOption status="Vacate" />
        </div>
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
        <div className="flex justify-evenly">
          <button
            className="px-12 py-2 border rounded-md text-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-12 py-2 rounded-md text-white ${
              isChecked
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isChecked}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResidenceStatus;
