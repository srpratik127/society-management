import React, { useEffect, useState } from "react";
import ViewAnnounce from "../models/ViewAnnouncement";
import axios from "axios";
import AddEditAnnouncement from "../models/AddEditAnnouncement";
import AnnouncementsCard from "./AnnouncementsCard";
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
          `${process.env.REACT_APP_BASE_URL}/v1/api/announcement`
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
        `${process.env.REACT_APP_BASE_URL}/v1/api/announcement/${selectedItem._id}`
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
            <AnnouncementsCard
              announcement={announcement}
              setIsAddEditAnnouncement={setIsAddEditAnnouncement}
              setSelectedItem={setSelectedItem}
              setIsViewPopupVisible={setIsViewPopupVisible}
              setIsDeleteOpen={setIsDeleteOpen}
            />
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
