import React from "react";

const ViewAnnounce = ({ announcement, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            View Announcement Protocol
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <img src="/assets/cross.svg" alt="" />
          </button>
        </div>
        <div className="space-y-4">
        <div>
            <p className="text-[#A7A7A7]">Announcement Type </p>
            <p className="text-base text-gray-900">{announcement.type}</p>
          </div>
          <div>
            <p className="text-[#A7A7A7]">Title</p>
            <p className="text-base text-gray-900">{announcement.title}</p>
          </div>
          <div>
            <p className="text-[#A7A7A7]">Description</p>
            <p className="text-base text-gray-900">
              {announcement.description}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#A7A7A7]">Date</p>
              <p className="text-base text-gray-900">
                {" "}
                {new Date(announcement.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-[#A7A7A7]">Time</p>
              <p className="text-base text-gray-900">{announcement.time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnnounce;
