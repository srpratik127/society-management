import React, { useState } from 'react';
import { announcementData } from '../../data/announcement';
import { Popover } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import AddAnnouncement from '../models/AddAnnouncement'; 

const Announcement = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false); 
    const [openDeleteIncome, setOpenDeleteIncome] = useState(false);
    const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false); 
    const navigate = useNavigate();
    return (
        <div className="p-6 m-6 rounded-xl bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Announcement</h2>
                <button
                    className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
                    onClick={() => setIsAddAnnouncementOpen(true)} 
                >
                    Create Announcement
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {announcementData.map((announcement) => (
                    <div key={announcement.id} className="bg-white shadow rounded-lg relative">
                        <div className="bg-blue-600 text-white p-2 rounded-t-lg flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{announcement.title}</h3>
                            <Popover className="relative">
                                <Popover.Button className="text-white hover:text-gray-300">
                                    <img src="/assets/3dots.svg" alt="options" />
                                </Popover.Button>
                                <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-2">
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => {
                                                setSelectedItem(announcement);
                                                setIsEditPopupVisible(true); 
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => {
                                                navigate("/admin/maintenance-details", {
                                                    state: { otherIncome: announcement },
                                                });
                                            }}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => {
                                                setOpenDeleteIncome(true);
                                                setSelectedItem(announcement);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </Popover.Panel>
                            </Popover>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600 p-1"><strong>Announcement Date:</strong> {announcement.date}</p>
                            <p className="text-gray-600 p-1"><strong>Announcement Time:</strong> {announcement.time}</p>
                            <p className="text-gray-600 mt-2 px-1"><strong>Description:</strong> {announcement.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {isAddAnnouncementOpen && (
                <AddAnnouncement 
                    isOpen={isAddAnnouncementOpen} 
                    onClose={() => setIsAddAnnouncementOpen(false)} 
                />
            )}
        </div>
    );
};

export default Announcement;
