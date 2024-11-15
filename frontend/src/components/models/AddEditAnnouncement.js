import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const AddEditAnnouncement = ({
  onClose,
  setAnnouncements,
  editAnnouncement,
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    date: false,
    time: false,
  });

  useEffect(() => {
    if (editAnnouncement) {
      setFormData({
        title: editAnnouncement?.title,
        description: editAnnouncement?.description,
        date: new Date(editAnnouncement?.date),
        time: convertTo24HourFormat(editAnnouncement.time),
      });
    }
  }, [editAnnouncement]);

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
  
    // Convert 12-hour time to 24-hour time
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";
  
    // Ensure that the hours are two digits (i.e., "05" instead of "5")
    hours = hours.padStart(2, "0");
  
    return `${hours}:${minutes}`;
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hoursIn12HrFormat = +hours % 12 || 12;
    const suffix = +hours < 12 ? "AM" : "PM";
    return `${hoursIn12HrFormat}:${minutes} ${suffix}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "time" ? value : value,
    });
    setErrors({
      ...errors,
      [name]: !value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
    setErrors({
      ...errors,
      date: !date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      title: !formData.title,
      description: !formData.description,
      date: !formData.date,
      time: !formData.time,
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) return;

    try {
      if (editAnnouncement) {
        // If editing, update the announcement
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/announcement/${editAnnouncement._id}`,
          {
            title: formData.title,
            description: formData.description,
            date: formData.date,
            time: formatTime(formData.time),
          }
        );
        setAnnouncements((prev) =>
          prev.map((announcement) =>
            announcement._id === response.data.data._id
              ? response.data.data
              : announcement
          )
        );
        console.log("Announcement Updated:", response.data?.data);
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/announcement`,
          {
            title: formData.title,
            description: formData.description,
            date: formData.date,
            time: formatTime(formData.time),
          }
        );
        setAnnouncements((prev) => [...prev, response.data?.data]);
        console.log("Announcement Created:", response.data?.data);
      }
      onClose();
    } catch (error) {
      console.error("Error creating/updating announcement:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] h-auto">
        <h2 className="text-xl font-semibold mb-4">Add Announcement</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Announcement Title*</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="title"
              className={`w-full border p-2 rounded mt-2 outline-none ${
                errors.title ? "border-red-500" : ""
              }`}
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Description*</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              className={`w-full border p-2 rounded mt-2 outline-none ${
                errors.description ? "border-red-500" : ""
              }`}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block font-poppins text-[14px] text-nowrap">
                Announcement Date*
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className={`w-[175px] border p-2 rounded-md mt-2 outline-none ${
                  errors.date ? "border-red-500" : ""
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">Date is required</p>
              )}
            </div>
            <div>
              <label className="block font-poppins text-[14px] text-nowrap">
                Announcement Time*
              </label>
              <input
                type="time"
                name="time"
                className={`w-[175px] border-[1px] p-2 rounded-md mt-2 outline-none ${
                  errors.time ? "border-red-500" : ""
                }`}
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">Time is required</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="border border-[#D3D3D3] w-[175px] text-[#202224] outline-none font-semibold py-2 px-4 rounded-md mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-[175px] font-semibold py-2 px-4 rounded-md ${"bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAnnouncement;
