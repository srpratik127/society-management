import React, { useState } from 'react';
import AddSecurity from '../../components/models/AddSecurity'; 
import EditSecurity from '../../components/models/EditSecurity';
import ViewSecurity from '../../components/models/ViewSecurity'; 
import guardsData from '../../data/guardData';

const SecurityGuard = () => {
  const [guards, setGuards] = useState(guardsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [selectedViewGuard, setSelectedViewGuard] = useState(null); 

  const handleAddSecurity = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (id) => {
    const guardToEdit = guards.find((guard) => guard.id === id);
    setSelectedGuard(guardToEdit);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedGuard(null);
  };
  const handleView = (id) => {
    const guardToView = guards.find((guard) => guard.id === id);
    setSelectedViewGuard(guardToView); 
    setIsViewModalOpen(true); 
  };
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false); 
    setSelectedViewGuard(null); 
  };
  const handleDelete = (id) => {
    console.log('Delete guard with ID:', id);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg m-4 sm:m-6 max-w-full ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Security Guard Details</h2>
        <button
          className="mt-4 sm:mt-0 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded flex items-center"
          onClick={handleAddSecurity}
        >
          <span className="pr-2">
            <img src="/assets/add-square.svg" alt="Add" />
          </span>
          Add Security
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
              <th className="py-4 px-2 sm:px-6 text-nowrap">Security Guard Name</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap">Phone Number</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Select Shift</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Shift Date</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Shift Time</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Gender</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {guards.map((guard) => (
              <tr key={guard.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-2 sm:px-6 flex items-center text-nowrap">
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
                    src={guard.image}
                    alt={guard.name}
                  />
                  {guard.name}
                </td>
                <td className="py-4 px-2 sm:px-6 text-nowrap">{guard.phone}</td>
                <td className="py-4 px-2 sm:px-6 text-nowrap text-center">
                  {guard.shift === 'Day' ? (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm font-medium rounded-full">
                      <img src="/assets/clips.png" alt="Day" />
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm font-medium rounded-full">
                      <img src="/assets/clips.1.png" alt="Night" />
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 sm:px-6 text-center text-nowrap">{guard.shiftDate}</td>
                <td className="py-4 px-2 sm:px-6 text-center text-nowrap">{guard.shiftTime}</td>
                <td className="py-4 px-2 sm:px-6 text-center text-nowrap">
                  {guard.gender === 'Male' ? (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm rounded-full">
                      <img src="/assets/male.png" alt="Male" />
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm rounded-full">
                      <img src="/assets/female.png" alt="Female" />
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 sm:px-6 text-center flex justify-center space-x-3">
                  <button
                    className="text-green-500 hover:text-green-700 h-10 w-10"
                    onClick={() => handleEdit(guard.id)}
                  >
                    <img src="/assets/edit.svg" alt="Edit" />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 h-10 w-10"
                    onClick={() => handleView(guard.id)}
                  >
                    <img src="/assets/blueeye.svg" alt="View" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 h-10 w-10"
                    onClick={() => handleDelete(guard.id)}
                  >
                    <img src="/assets/delete.svg" alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddSecurity isOpen={isModalOpen} onClose={handleCloseModal} />
      {selectedGuard && (
        <EditSecurity
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          guardData={selectedGuard} 
        />
      )}
      {selectedViewGuard && (
        <ViewSecurity
          guard={selectedViewGuard} 
          onClose={handleCloseViewModal} 
        />
      )}
    </div>
  );
};

export default SecurityGuard;
