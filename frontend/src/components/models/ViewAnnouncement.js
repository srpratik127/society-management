import React from 'react';

const ViewAnnounce = ({ announcement, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">View Security Protocol</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                      <img src="/assets/cross.svg" alt="" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Title</p>
                        <p className="text-base text-gray-900">{announcement.title}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Description</p>
                        <p className="text-base text-gray-900">{announcement.description}</p>
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Date</p>
                            <p className="text-base text-gray-900">{announcement.date}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Time</p>
                            <p className="text-base text-gray-900">{announcement.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAnnounce;
