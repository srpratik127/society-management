import React, { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import ViewAnnounce from "../models/ViewAnnouncement";
import axios from "axios";
import AddEditAnnouncement from "../models/AddEditAnnouncement";
import DeleteModel from "../models/DeleteModel";
import toast from "react-hot-toast";

const Announcement = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddEditAnnouncement, setIsAddEditAnnouncement] = useState(false);
  const [isViewPopupVisible, setIsViewPopupVisible] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/announcement`
        );
        setAnnouncements(response?.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchComplainList();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/announcement/${selectedItem._id}`
      );
      setAnnouncements((prev) =>
        prev.filter((complain) => complain._id !== selectedItem._id)
      );
      toast.success("Announcement Delete successful!");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 m-6 rounded-xl bg-[#FFFFFF]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Announcement</h2>
        <button
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
          onClick={() => setIsAddEditAnnouncement(true)}
        >
          Create Announcement
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white shadow rounded-lg relative"
            >
              <div className="bg-[#5678E9] text-white p-2 py-3 rounded-t-lg flex justify-between items-center">
                <h3 className="text-lg font-semibold">{announcement.title}</h3>
                <Popover className="relative">
                  <Popover.Button className="text-white outline-none">
                    <img src="/assets/3dots.svg" alt="options" />
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
              </div>
              <div className="p-4">
                <p className="text-gray-600 flex justify-between p-1">
                  <span>Announcement Date:</span>{" "}
                  <span className="text-black">
                    {new Date(announcement.date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p className="text-gray-600 flex justify-between p-1">
                  <span>Announcement Time:</span>{" "}
                  <span className="text-black">{announcement.time}</span>
                </p>
                <p className="text-gray-600 mt-2 px-1">
                  <span>Description:</span>{" "}
                  <span className="text-black block">
                    {announcement.description}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-full">
            <p className="text-gray-500 text-center select-none">
              No Data found.
            </p>
          </div>
        )}
      </div>
      {isViewPopupVisible && selectedItem && (
        <ViewAnnounce
          announcement={selectedItem}
          onClose={() => {
            setIsViewPopupVisible(false);
            setSelectedItem(null);
          }}
        />
      )}
      {isAddEditAnnouncement && (
        <AddEditAnnouncement
          onClose={() => {
            setIsAddEditAnnouncement(false);
            setSelectedItem(null);
          }}
          setAnnouncements={setAnnouncements}
          editAnnouncement={selectedItem}
        />
      )}

      {isDeleteOpen && (
        <DeleteModel
          closePopup={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
          message={{
            title: "Delete Announcement?",
            sms: "Are you sure you want to delate this Security?",
          }}
        />
      )}
    </div>
  );
};

export default Announcement;
