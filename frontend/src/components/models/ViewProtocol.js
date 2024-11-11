import React from 'react';

const ViewProtocol = ({ protocol, onClose }) => {
  if (!protocol) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="flex justify-between text-2xl font-semibold mb-4">
        View Security Protocol
          <button
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <img src="/assets/cross.svg" alt="Close" />
          </button>
        </h2>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Title</h3>
          <p className="text-gray-700">{protocol.title}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Description</h3>
          <p className="text-gray-700">{protocol.description}</p>
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <h3 className="font-semibold text-gray-700">Date</h3>
            <p className="text-gray-700">{protocol.date}</p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-gray-700">Time</h3>
            <p className="text-gray-700">{protocol.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProtocol;
