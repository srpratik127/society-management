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
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = (entry) => {
    setSelectedRequest(entry);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRequest(null);
  };
  const openDeleteModal = (entry) => {
    setSelectedRequest(entry);
  };
  const closeDeleteModal = () => {
  };
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
    closeDeleteModal();
  };
  return (
    <div className="p-6 bg-gray-50 m-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create Request</h2>
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
      <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[#d0d9f7] text-black">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Complainer Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Request Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Request Date</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Unit Number</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Priority</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Status</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaintData.map((entry, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-700 flex">
                <img src="/assets/Avatar.png" className="px-3" alt="avatar" />
                {entry.name}
              </td>
              <td className="py-3 px-4 text-gray-700 text-center">{entry.requestName}</td>
              <td className="py-3 px-4 text-gray-700 text-center">{entry.description}</td>
              <td className="py-3 px-4 text-gray-700 text-center">{entry.date}</td>
              <td className="py-3 px-4 text-gray-700 text-center">
                <span className="px-2 text-[#5678E9] bg-[#F6F8FB] rounded-full">
                  {entry.wing}
                </span>
                {entry.unitNumber}
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${entry.priority === 'High' ? 'bg-red-500' : entry.priority === 'Medium' ? 'bg-blue-500' : 'bg-green-500'}`}
                >
                  {entry.priority}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`w-20 px-3 py-1 rounded-full text-sm text-gray-800 text-center ${entry.status === 'Pending' ? 'bg-yellow-300' : entry.status === 'Open' ? 'bg-blue-200' : 'bg-green-200'}`}
                >
                  {entry.status}
                </span>
              </td>
              <td className="py-3 px-4 flex space-x-3">
                <button onClick={() => openEditModal(entry)} className="text-green-500 hover:text-green-700">
                  <img src="/assets/edit.svg" alt="edit" />
                </button>
                <button onClick={() => openViewModal(entry)} className="text-blue-500 hover:text-blue-700">
                  <img src="/assets/blueeye.svg" alt="view" />
                </button>
                <button onClick={() => openDeleteModal(entry)} className="text-red-500 hover:text-red-700">
                  <img src="/assets/delete.svg" alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTracking;
