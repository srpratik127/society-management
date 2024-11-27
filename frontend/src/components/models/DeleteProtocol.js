import React from 'react';

const DeleteProtocol = ({ protocol, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Delete Protocol?</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to delete this protocol?</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-white border border-gray-300 font-semibold text-gray-700 py-2 px-4 rounded-lg w-[175px]"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(protocol.id)}
            className="py-2 px-4 rounded-lg w-[175px] bg-red-500 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProtocol;
