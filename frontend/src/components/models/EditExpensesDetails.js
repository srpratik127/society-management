import axios from "axios";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const EditExpensesDetails = ({ onClose, expense, setExpansesData }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(expense.bill || "");
  const [title, setTitle] = useState(expense?.title || "");
  const [description, setDescription] = useState(expense?.description || "");
  const [date, setDate] = useState(new Date(expense?.dueDate) || "");
  const [amount, setAmount] = useState(expense?.amount || "");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!date) newErrors.date = "Date is required";
    if (!amount) newErrors.amount = "Amount is required";
    if (!file && !fileName) newErrors.fileName = "File upload is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", date);
        formData.append("amount", amount);
        if (file) {
          formData.append("bill", file); // Append the file if new file is selected
        }

        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/expenses/${expense._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setExpansesData((prevData) =>
          prevData.map((item) =>
            item._id === expense._id ? response.data : item
          )
        );
        toast.success("Expenses Update successful!");
        onClose();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Expenses Details</h2>
        <div className="mb-4">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="">
            <label className="text-sm font-medium">Date*</label>
            <DatePicker
              selected={date}
              onChange={setDate}
              className="w-full p-2 border rounded-md outline-none"
            />
          </div>
          <div className="">
            <label className="text-sm font-medium">Amount*</label>
            <input
              type="text"
              placeholder="₹ 0000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md outline-none"
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-xs">{errors.amount}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Upload Bill</label>
          <div
            onClick={() => fileInputRef.current.click()}
            className={`mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 cursor-pointer ${
              errors.fileName && "border-red-500"
            }`}
          >
            <img
              src="/assets/addPhoto.svg"
              alt="Upload Icon"
              className="w-6 h-6"
            />
            {fileName ? (
              <p className="mt-2 text-sm text-gray-700 font-medium">
                {`...${fileName.slice(-36)}`}
              </p>
            ) : (
              <p className="mt-2 text-sm text-blue-500 font-medium">
                Upload a file
              </p>
            )}
            <span className="text-[#A7A7A7] text-sm mt-3">
              PNG, JPG, GIF up to 10MB
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".png,.jpeg,.jpg,"
            onChange={handleFileChange}
          />
          {errors.fileName && (
            <p className="text-red-500 text-xs">{errors.fileName}</p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full border rounded-lg py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg py-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpensesDetails;
