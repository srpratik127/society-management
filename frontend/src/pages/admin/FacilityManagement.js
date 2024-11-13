import React, { useEffect, useState } from "react";
import CreateFacilityManagement from "../../components/models/CreateFacilityManagement";
import EditFacilityManagement from "../../components/models/EditFacilityManagement";
import axios from "axios";

const FacilityManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/facilities`
        );
        setFacilities(response?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchComplainList();
  }, []);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const handleCreateFacility = () => {
    setIsCreateModalOpen(true);
  };
  const handleEditFacility = (facility) => {
    setSelectedFacility(facility);
    setIsEditModalOpen(true);
  };
  const handleClose = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedFacility(null);
  };
  const handleSave = (facilityData) => {
    if (selectedFacility) {
      console.log("Facility updated:", facilityData);
    } else {
      console.log("Facility saved:", facilityData);
    }
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };
  return (
    <div className="p-6 bg-white m-5 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Facility Management</h1>
        <button
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg sm:py-3 md:py-4 lg:py-4"
          onClick={handleCreateFacility}
        >
          Create Facility
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.length > 0 ? (
          facilities.map((facility, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
              <div className="bg-[#5678E9] text-white px-4 py-2 flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-medium">{facility.title}</h2>
                <button className="relative text-white" onClick={() => handleEditFacility(facility)}>
                  <img src="/assets/3dots.svg" alt="Menu" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm md:text-base">
                  <strong>Upcoming Schedule Service Date:</strong> {facility.date}
                </p>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  <strong>Description:</strong> {facility.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-full">
            <p className="text-gray-500 text-center select-none">No Data found.</p>
          </div>
        )}
      </div>
      {isCreateModalOpen && (
        <CreateFacilityManagement onClose={handleClose} onSave={handleSave} />
      )}
      {isEditModalOpen && selectedFacility && (
        <EditFacilityManagement
          onClose={handleClose}
          onSave={handleSave}
          facility={selectedFacility}
        />
      )}
    </div>
  );
};

export default FacilityManagement;
