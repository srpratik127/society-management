import React, { useState } from 'react';
import facilitiesManagement from '../../data/facilitiesManagement';
import CreateFacilityManagement from '../../components/models/CreateFacilityManagement'; 
import EditFacilityManagement from '../../components/models/EditFacilityManagement';

const FacilityManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      console.log('Facility updated:', facilityData);
    } else {
      console.log('Facility saved:', facilityData);
    }
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Facility Management</h1>
        <button 
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
          onClick={handleCreateFacility}
        >
          Create Facility
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilitiesManagement.map((facility, index) => (
          <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-[#5678E9] text-white px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-medium">{facility.title}</h2>
              <button 
                className="relative text-white"
                onClick={() => handleEditFacility(facility)}
              >
                <img src='/assets/3dots.svg' alt="Menu" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-600">
                <strong>Upcoming Schedule Service Date:</strong> {facility.date}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Description:</strong> {facility.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isCreateModalOpen && (
        <CreateFacilityManagement onClose={handleClose} onSave={handleSave} />
      )}
      {isEditModalOpen && selectedFacility && (
        <EditFacilityManagement onClose={handleClose} onSave={handleSave} facility={selectedFacility} />
      )}
    </div>
  );
};

export default FacilityManagement;
