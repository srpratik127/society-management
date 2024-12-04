import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Popover } from "@headlessui/react";

const AddEditAnnouncement = ({
  onClose,
  setAnnouncements,
  editAnnouncement,
}) => {
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({
    type: false,
    title: false,
    description: false,
    date: false,
    time: false,
  });

  useEffect(() => {
    if (editAnnouncement) {
      setFormData({
        type: editAnnouncement?.type,
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

    hours = hours.toString();

    if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";

    hours = hours.toString().padStart(2, "0");

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
      type: !formData.type,
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
        setLoader(true);
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/v1/api/announcement/${editAnnouncement._id}`,
          {
            type: formData.type,
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
        setLoader(false);
        toast.success("Announcement Updated successful!");
      } else {
        setLoader(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/api/announcement`,
          {
            type: formData.type,
            title: formData.title,
            description: formData.description,
            date: formData.date,
            time: formatTime(formData.time),
          }
        );
        setAnnouncements((prev) => [...prev, response.data?.data]);
        setLoader(false);
        toast.success("Announcement Created successful!");
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] h-auto">
        <h2 className="text-xl font-semibold mb-4">
          {editAnnouncement ? "Edit" : "Add"} Announcement
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">
              Announcement Type<span className="text-red-500">*</span>
            </label>
            <Popover className="relative">
              <Popover.Button
                className={`outline-none p-2 border w-full text-start flex justify-between rounded ${
                  errors.type ? "border-red-500" : "border-gray-200"
                } ${formData.type ? "text-black" : "text-gray-400"}`}
              >
                {formData.type || "Select Announcement Type"}
              </Popover.Button>
              <Popover.Panel className="mt-2 w-full bg-white rounded-lg shadow ring-1 ring-black ring-opacity-5 z-50">
                {({ close }) => (
                  <div className="py-2">
                    {["Event", "Activity"].map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, type: state });
                          setErrors({ ...errors, type: false });
                          close()
                        }}
                        className={`px-4 py-1 flex gap-2 rounded-lg font-medium ${
                          formData.type === state
                            ? "border-[#FE512E]"
                            : "border-gray-200 text-[#A7A7A7]"
                        }`}
                      >
                        <img
                          src={`${
                            formData.type === state
                              ? "/assets/fill-redio.svg"
                              : "/assets/unfill-redio.svg"
                          }`}
                          alt=""
                        />{" "}
                        {state}
                      </button>
                    ))}
                  </div>
                )}
              </Popover.Panel>
            </Popover>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">Type is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block">
              Announcement Title<span className="text-red-500">*</span>
            </label>
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
            <label className="block">
              Description<span className="text-red-500">*</span>
            </label>
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
                Announcement Date<span className="text-red-500">*</span>
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
                Announcement Time<span className="text-red-500">*</span>
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
              disabled={loader}
              className={`w-[175px] font-semibold py-2 px-4 rounded-md ${"bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"}`}
            >
              {!loader ? "Save" : <Loader />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAnnouncement;
