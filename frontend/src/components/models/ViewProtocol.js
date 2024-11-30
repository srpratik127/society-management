import React from "react";
import {formatTime} from "../../utils/validation";

const ViewProtocol = ({ protocol, onClose }) => {
  if (!protocol) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="flex justify-between text-xl font-semibold mb-4">
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
            <p className="text-gray-700">
              {new Date(protocol.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-gray-700">Time</h3>
            <p className="text-gray-700">{formatTime(protocol.time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProtocol;
