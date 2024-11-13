import React, { useState } from 'react';
import { complaintData } from '../../data/complaint';
import CreateRequestTracking from '../../components/models/CreateRequestTracking';
import EditRequestTracking from '../../components/models/EditRequestTracking';
import ViewRequestTracking from '../../components/models/ViewRequestTracking';

const RequestTracking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (entry) => {
    setSelectedRequest(entry);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRequest(null);
  };
  const openDeleteModal = (entry) => setSelectedRequest(entry);
  const openViewModal = (entry) => {
    setSelectedRequest(entry);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedRequest(null);
  };
  const handleDelete = () => {
    console.log('Deleting request:', selectedRequest);
    setSelectedRequest(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 m-4 sm:m-6 rounded-lg shadow-lg max-w-full lg:max-w-6xl">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Create Request</h2>
        <button
          onClick={openModal}
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
        >
          Create Request
        </button>
      </div>
      {isModalOpen && <CreateRequestTracking onClose={closeModal} />}
      {isEditModalOpen && (
        <EditRequestTracking
          onClose={closeEditModal}
          existingData={selectedRequest}
        />
      )}
      {isViewModalOpen && (
        <ViewRequestTracking
          complaint={selectedRequest}
          onClose={closeViewModal}
        />
      )}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden min-w-[640px]">
          <thead className="bg-[#d0d9f7] text-black">
            <tr>
              {["Complainer Name", "Request Name", "Description", "Request Date", "Unit Number", "Priority", "Status", "Action"].map((header, idx) => (
                <th key={idx} className="py-2 px-2 sm:px-4 text-left font-semibold text-gray-600 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaintData.map((entry, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-2 sm:px-4 text-gray-700 flex items-center">
                  <img src="/assets/Avatar.png" className="w-6 h-6 sm:w-8 sm:h-8 mr-2" alt="avatar" />
                  {entry.name}
                </td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 text-center">{entry.requestName}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 text-center">{entry.description}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 text-center">{entry.date}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 text-center">
                  <span className="px-2 text-[#5678E9] bg-[#F6F8FB] rounded-full">{entry.wing}</span>
                  {entry.unitNumber}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${entry.priority === 'High' ? 'bg-red-500' : entry.priority === 'Medium' ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {entry.priority}
                  </span>
                </td>
                <td className="py-3 px-2 sm:px-4 text-center">
                  <span className={`w-20 px-3 py-1 rounded-full text-sm text-gray-800 ${entry.status === 'Pending' ? 'bg-yellow-300' : entry.status === 'Open' ? 'bg-blue-200' : 'bg-green-200'}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="py-3 px-2 sm:px-4 flex space-x-2 justify-center">
                  <button onClick={() => openEditModal(entry)} className="text-green-500 hover:text-green-700 h-8 w-8">
                    <img src="/assets/edit.svg" alt="edit" />
                  </button>
                  <button onClick={() => openViewModal(entry)} className="text-blue-500 hover:text-blue-700 h-8 w-8">
                    <img src="/assets/blueeye.svg" alt="view" />
                  </button>
                  <button onClick={() => openDeleteModal(entry)} className="text-red-500 hover:text-red-700 h-8 w-8">
                    <img src="/assets/delete.svg" alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTracking;
