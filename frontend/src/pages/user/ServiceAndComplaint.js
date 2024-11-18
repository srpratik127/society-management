import React, { useState } from "react";
import { serviceandComplaint } from "../../data/service-complaint";
import { Popover } from "@headlessui/react";
import CreateComplaint from "../admin/CreateComplaint";


const ServiceAndComplaint = () => {
    const [activeTab, setActiveTab] = useState("complaints");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <div className="m-6">
            <div className="flex ">
                <button
                    className={`py-3 px-4 font-semibold text-sm rounded-tl-lg rounded-tr-lg border-b focus:outline-none ${activeTab === "complaints"
                        ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                        : "bg-white text-black"
                        }`}
                    onClick={() => setActiveTab("complaints")}
                >
                    Complaint Submission
                </button>
                <button
                    className={`py-3 px-4 font-semibold text-sm rounded-tl-lg rounded-tr-lg border-b focus:outline-none ${activeTab === "requests"
                        ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                        : "bg-white text-black"
                        }`}
                    onClick={() => setActiveTab("requests")}
                >
                    Request Submission
                </button>
            </div>

            {activeTab === "complaints" && (
                <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <h2 className="text-lg font-bold mb-4">Complaint</h2>
                        </div>
                        <div className="bg-gradient-to-r from-[#FE512E] to-[#F09619] rounded-lg px-3 py-2 text-white font-semibold">
                            <button>Create Complaint</button>
                        </div>
                    </div>
                    {serviceandComplaint?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {serviceandComplaint.map((complaint, index) => (
                                <div className="bg-white shadow rounded-lg">
                                    <div className="flex justify-between rounded-t-lg items-center mb-2 px-3 py-2 bg-[#5678E9]">
                                        <h3 className="font-semibold text-base text-white">
                                            {complaint.title}
                                        </h3>
                                        <Popover className="relative">
                                            <Popover.Button className="outline-none">
                                                <img src="/assets/3dots.svg" alt="options" />
                                            </Popover.Button>
                                            <Popover.Panel className="absolute right-0  w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="py-2">
                                                    <button
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        onClick={() => {
                                                            setSelectedNote(complaint);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </Popover.Panel>
                                        </Popover>
                                    </div>
                                    <div className="text-sm px-2 text-gray-500 flex justify-between">
                                        <div className="font-semibold">Request Date:</div>
                                        {complaint.requestDate}
                                    </div>
                                    <div className="text-sm px-2 py-1 text-gray-500 flex justify-between items-center">
                                        <div className="font-semibold">Status:</div>
                                        <div
                                            className={`px-2 py-1 rounded-full ${complaint.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : complaint.status === "Resolved" || complaint.status === "Solve"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            {complaint.status}
                                        </div>
                                    </div>
                                    <div className="text-sm px-2 text-gray-500 mt-2">
                                        <div className="font-semibold">Description:</div>
                                        {complaint.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No complaints to display at the moment.</p>
                    )}
                </div>
            )}

            {activeTab === "requests" && (
                <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <h2 className="text-lg font-bold mb-4">Request</h2>
                    </div>
                    <div className="bg-gradient-to-r from-[#FE512E] to-[#F09619] rounded-lg px-3 py-2 text-white font-semibold">
                        <button>Create Request</button>
                    </div>
                </div>
                {serviceandComplaint?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceandComplaint.map((complaint, index) => (
                            <div className="bg-white shadow rounded-lg">
                                <div className="flex justify-between rounded-t-lg items-center mb-2 px-3 py-2 bg-[#5678E9]">
                                    <h3 className="font-semibold text-base text-white">
                                        {complaint.title}
                                    </h3>
                                    <Popover className="relative">
                                        <Popover.Button className="outline-none">
                                            <img src="/assets/3dots.svg" alt="options" />
                                        </Popover.Button>
                                        <Popover.Panel className="absolute right-0  w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-2">
                                                <button
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    onClick={() => {
                                                        setSelectedNote(complaint);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                </div>
                                <div className="text-sm px-2 text-gray-500 flex justify-between">
                                    <div className="font-semibold">Request Date:</div>
                                    {complaint.requestDate}
                                </div>
                                <div className="text-sm px-2 py-1 text-gray-500 flex justify-between items-center">
                                    <div className="font-semibold">Status:</div>
                                    <div
                                        className={`px-2 py-1 rounded-full ${complaint.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : complaint.status === "Resolved" || complaint.status === "Solve"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-blue-100 text-blue-600"
                                            }`}
                                    >
                                        {complaint.status}
                                    </div>
                                </div>
                                <div className="text-sm px-2 text-gray-500 mt-2">
                                    <div className="font-semibold">Description:</div>
                                    {complaint.description}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No complaints to display at the moment.</p>
                )}
            </div>
            )}
        </div>
    );
};

export default ServiceAndComplaint;
