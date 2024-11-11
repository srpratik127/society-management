import React, { useState } from 'react';
import securityProtocolData from '../../data/SecurityProtocolsData';
import CreateProtocol from '../../components/models/CreateProtocol';
import EditProtocol from '../../components/models/EditProtocol';
import ViewProtocol from '../../components/models/ViewProtocol';
import DeleteProtocol from '../../components/models/DeleteProtocol'; 

const SecurityProtocols = () => {
  const [protocols, setProtocols] = useState(securityProtocolData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const openCreateModal = () => {
    setIsModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = (protocol) => {
    setSelectedProtocol(protocol);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProtocol(null);
  };
  const openViewModal = (protocol) => {
    setSelectedProtocol(protocol);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProtocol(null);
  };
  const openDeleteModal = (protocol) => {
    setSelectedProtocol(protocol);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProtocol(null);
  };
  const handleSaveProtocol = (newProtocol) => {
    setProtocols((prevProtocols) => [...prevProtocols, newProtocol]);
  };
  const handleUpdateProtocol = (updatedProtocol) => {
    setProtocols((prevProtocols) =>
      prevProtocols.map((protocol) =>
        protocol.id === updatedProtocol.id ? updatedProtocol : protocol
      )
    );
    closeEditModal();
  };
  const handleDeleteProtocol = (id) => {
    setProtocols((prevProtocols) =>
      prevProtocols.filter((protocol) => protocol.id !== id)
    );
    closeDeleteModal(); 
  };
  return (
    <div className="p-6 bg-gray-50 m-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Security Protocols</h2>
        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
        >
          Create Protocol
        </button>
      </div>
      <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[#d0d9f7] text-black">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Title</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Date</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Time</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {protocols.map((protocol, index) => (
            <tr key={protocol.id} className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-700 text-center">{protocol.title}</td>
              <td className="py-3 px-4 text-gray-700 text-center">{protocol.description}</td>
              <td className="py-3 px-4 text-gray-700 text-center">{protocol.date}</td>
              <td className="py-3 px-4 text-gray-700 text-center">{protocol.time}</td>
              <td className="py-3 px-4 flex space-x-3 text-center">
                <button
                  onClick={() => openEditModal(protocol)}
                  className="text-green-500 hover:text-green-700"
                >
                  <img src="/assets/edit.svg" alt="Edit" />
                </button>
                <button
                  onClick={() => openViewModal(protocol)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <img src="/assets/blueeye.svg" alt="View" />
                </button>
                <button
                  onClick={() => openDeleteModal(protocol)}
                  className="text-red-500 hover:text-red-700"
                >
                  <img src="/assets/delete.svg" alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CreateProtocol onClose={closeCreateModal} onSave={handleSaveProtocol} />
      )}
      {isEditModalOpen && selectedProtocol && (
        <EditProtocol
          protocol={selectedProtocol}
          onClose={closeEditModal}
          onSave={handleUpdateProtocol}
        />
      )}
      {isViewModalOpen && selectedProtocol && (
        <ViewProtocol protocol={selectedProtocol} onClose={closeViewModal} />
      )}
      {isDeleteModalOpen && selectedProtocol && (
        <DeleteProtocol
          protocol={selectedProtocol}
          onClose={closeDeleteModal}
          onDelete={handleDeleteProtocol} 
        />
      )}
    </div>
  );
};

export default SecurityProtocols;
