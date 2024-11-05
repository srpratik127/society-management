import React, { useState } from "react";

const ResidenceStatus = ({ resident, onClose, onSave }) => {
    const [selectedStatus, setSelectedStatus] = useState(resident.unitStatus || "Occupied");
    const [isChecked, setIsChecked] = useState(false);

    const handleSave = () => {
        onClose();
        if(selectedStatus==="Occupied"){

        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-90 shadow-lg">
                <h1 className="text-xl font-semibold mb-4">Residence Status</h1>

                <div className="flex justify-around mb-4">
                    <label
                        className={`flex px-4 items-center space-x-2 cursor-pointer ${selectedStatus === "Occupied" ? "text-orange-600 border border-orange-500" : "text-gray-500 border border-gray"
                            } rounded-md`} 
                    >
                        <input
                            type="radio"
                            name="status"
                            value="Occupied"
                            checked={selectedStatus === "Occupied"}
                            onChange={() => setSelectedStatus("Occupied")}
                            className="hidden"
                        />
                        <img
                            src={`${selectedStatus === "Occupied"
                                ? "/assets/fill-redio.svg"
                                : "/assets/unfill-redio.svg"
                                }`}
                            alt="Occupied status icon"
                        />
                        <span
                            className={`py-2 rounded-md ${selectedStatus === "Occupied" ? "border-orange-500" : "border-gray-300"
                                }`}
                        >
                            Occupied
                        </span>
                    </label>

                    <label
                        className={`flex px-4 items-center space-x-2 cursor-pointer ${selectedStatus === "Vacate" ? "text-orange-600 border border-orange-500" : "text-gray-500 border border-gray"
                            } rounded-md`} 
                    >
                        <input
                            type="radio"
                            name="status"
                            value="Vacate"
                            checked={selectedStatus === "Vacate"}
                            onChange={() => setSelectedStatus("Vacate")}
                            className="hidden"
                        />
                        <img
                            src={`${selectedStatus === "Vacate"
                                ? "/assets/fill-redio.svg"
                                : "/assets/unfill-redio.svg"
                                }`}
                            alt="Vacate status icon"
                        />
                        <span
                            className={`py-2 rounded-md ${selectedStatus === "Vacate" ? "border-orange-500" : "border-gray-300"
                                }`}
                        >
                            Vacate
                        </span>
                    </label>
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
                        className={`px-12 py-2 rounded-md text-white ${isChecked
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
