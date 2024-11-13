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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Security Guard Details</h2>
        <button
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded flex"
          onClick={handleAddSecurity}>
             <span className="pr-2">
              <img src="/assets/add-square.svg" alt="Add" />
            </span>
          Add Security
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
            <th className="py-4 px-6">Security Guard Name</th>
            <th className="py-4 px-6">Phone Number</th>
            <th className="py-4 px-6 text-center">Select Shift</th>
            <th className="py-4 px-6 text-center">Shift Date</th>
            <th className="py-4 px-6 text-center">Shift Time</th>
            <th className="py-4 px-6 text-center">Gender</th>
            <th className="py-4 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {guards.map((guard) => (
            <tr key={guard.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6 flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-3"
                  src={guard.image}
                  alt={guard.name}
                />
                {guard.name}
              </td>
              <td className="py-4 px-6">{guard.phone}</td>
              <td className="py-4 px-6 text-center">
                {guard.shift === 'Day' ? (
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full">
                    <img src="/assets/clips.png" alt="Day" />
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full">
                    <img src="/assets/clips.1.png" alt="Night" />
                  </span>
                )}
              </td>
              <td className="py-4 px-6 text-center">{guard.shiftDate}</td>
              <td className="py-4 px-6 text-center">{guard.shiftTime}</td>
              <td className="py-4 px-6 text-center">
                {guard.gender === 'Male' ? (
                  <span className="inline-block px-3 py-1 text-sm rounded-full">
                    <img src="/assets/male.png" alt="Male" />
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 text-sm rounded-full">
                    <img src="/assets/female.png" alt="Female" />
                  </span>
                )}
              </td>
              <td className="py-4 px-6 text-center flex justify-center space-x-3">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleEdit(guard.id)}
                >
                  <img src="/assets/edit.svg" alt="Edit" />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleView(guard.id)}
                >
                  <img src="/assets/blueeye.svg" alt="View" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(guard.id)}
                >
                  <img src="/assets/delete.svg" alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
