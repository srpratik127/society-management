import { Popover } from "@headlessui/react";
import React from "react";

const AnnouncementsCard = ({
  announcement,
  setIsAddEditAnnouncement,
  setSelectedItem,
  setIsViewPopupVisible,
  setIsDeleteOpen,
  isResident
}) => {
  return (
    <div key={announcement._id} className="bg-white shadow rounded-lg relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl "
    >
      <div className="bg-[#5678E9] text-white p-2 py-3 rounded-t-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold truncate max-w-[80%]">{announcement.title}</h3>
        {!isResident && (
          <Popover className="relative">
            <Popover.Button className="text-white outline-none">
              <img src="/assets/3dots.svg" alt="options" className="w-5 h-5"/>
            </Popover.Button>
            <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-2">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setIsAddEditAnnouncement(true);
                    setSelectedItem(announcement);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setSelectedItem(announcement);
                    setIsViewPopupVisible(true);
                  }}
                >
                  View
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setIsDeleteOpen(true);
                    setSelectedItem(announcement);
                  }}
                >
                  Delete
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-600 flex justify-between p-1 text-sm sm:text-base">
          <span>Announcement Date:</span>{" "}
          <span className="text-black">
            {new Date(announcement.date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </p>
        <p className="text-gray-600 flex justify-between p-1 text-sm sm:text-base">
          <span>Announcement Time:</span>{" "}
          <span className="text-black">{announcement.time}</span>
        </p>
        <p className="text-gray-600 mt-2 px-1 text-sm sm:text-base">
          <span>Description:</span>{" "}
          <span className="text-black block">{announcement.description}</span>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
