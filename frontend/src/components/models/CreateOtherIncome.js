import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { AddNotification } from "../../store/NotificationSlice";
import { useDispatch } from "react-redux";

const CreateOtherIncome = ({ onClose, setOtherIncomeData }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    dueDate: "",
    description: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!title) formErrors.title = "Title is required";
    if (!date) formErrors.date = "Date is required";
    if (!dueDate) formErrors.dueDate = "Due Date is required";
    if (!description) formErrors.description = "Description is required";
    if (!amount) formErrors.amount = "Amount is required";
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const incomeData = {
        title,
        date: date,
        dueDate: dueDate,
        description,
        amount,
      };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/api/income`,
          incomeData
        );
        toast.success("Income created successfully!");
        setOtherIncomeData((pre) => [...pre, response.data?.data]);
        dispatch(AddNotification(response.data?.notification));
        onClose();
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">Create Other Income</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title}</span>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className={`w-full border rounded-md outline-none p-2 ${
                  errors.date && "border-red-500"
                }`}
              />
              {errors.date && (
                <span className="text-sm text-red-500">{errors.date}</span>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Due Date</label>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className={`w-full border rounded-md outline-none p-2 ${
                  errors.dueDate && "border-red-500"
                }`}
              />
              {errors.dueDate && (
                <span className="text-sm text-red-500">{errors.dueDate}</span>
              )}
            </div>
          </div>
          <div className="text-sm">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Amount</label>
            <div className="flex border rounded-lg overflow-hidden">
              <span className="flex items-center justify-center text-lg pl-3 py-2">
                ₹
              </span>
              <input
                type="text"
                placeholder=" 0000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pr-3 py-2 focus:outline-none ${
                  errors.amount && "border-red-500"
                }`}
              />
            </div>
            {errors.amount && (
              <span className="text-sm text-red-500">{errors.amount}</span>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 w-full border rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-gradient-to-r from-[#FE512E] to-[#F09619]  text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOtherIncome;
