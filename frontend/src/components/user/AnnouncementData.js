import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AnnouncementsCard from "../admin/AnnouncementsCard";

const AnnouncementData = () => {
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

  return (
    <div className="bg-white p-4 m-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 ">Announcement Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementsCard
              announcement={announcement}
              //   setIsAddEditAnnouncement={setIsAddEditAnnouncement}
              //   setSelectedItem={setSelectedItem}
              //   setIsViewPopupVisible={setIsViewPopupVisible}
              //   setIsDeleteOpen={setIsDeleteOpen}
              isResident={true}
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
    </div>
  );
};

export default AnnouncementData;
