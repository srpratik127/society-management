import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ImportantNumber = ({ closePopup, initialData, setImportantNumbers }) => {
  const [formData, setFormData] = useState({
    fullName: initialData ? initialData.fullName : "",
    phoneNumber: initialData ? initialData.phoneNumber : "",
    work: initialData ? initialData.work : "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const { fullName, phoneNumber, work } = formData;
    const newErrors = {
      fullName: !fullName.trim()
        ? "Full Name is required."
        : fullName.length < 2
        ? "Must be at least 2 characters."
        : "",
      phoneNumber: !phoneNumber.trim()
        ? "Phone Number is required."
        : !/^\d{10}$/.test(phoneNumber)
        ? "Must be a 10-digit number."
        : "",
      work: !work.trim()
        ? "Work is required."
        : work.length < 3
        ? "Must be at least 3 characters."
        : "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (initialData) {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/v1/api/numbers/${initialData._id}`,
            {
              fullName: formData.fullName,
              phoneNumber: formData.phoneNumber,
              work: formData.work,
            },
            {
              withCredentials: true,
            }
          );
          setImportantNumbers((prev) => {
            return prev.map((number) =>
              number._id === initialData._id ? response.data.data : number
            );
          });
          toast.success("Numbers Update successful!");
        } else {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/v1/api/numbers`,
            {
              fullName: formData.fullName,
              phoneNumber: formData.phoneNumber,
              work: formData.work,
            },
            {
              withCredentials: true,
            }
          );
          setImportantNumbers((pre) => [response?.data?.data, ...pre]);
          toast.success("Numbers Created successful!");
        }
        closePopup();
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]:
        id === "phoneNumber"
          ? !/^\d{10}$/.test(value)
            ? "Must be a 10-digit number."
            : ""
          : !value.trim()
          ? `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`
          : id === "fullName" && value.length < 2
          ? "Must be at least 2 characters."
          : id === "work" && value.length < 3
          ? "Must be at least 3 characters."
          : "",
    }));
  };

  const isFormComplete = Object.values(formData).every(Boolean);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
        <h2 className="text-xl font-semibold mb-6">
          {initialData ? "Edit Important Number" : "Add Important Number"}
        </h2>
        <form onSubmit={handleSubmit}>
          {["fullName", "phoneNumber", "work"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field === "phoneNumber"
                  ? "Phone Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "phoneNumber" ? "tel" : "text"}
                id={field}
                placeholder={`Enter ${field}`}
                className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600 ${
                  errors[field] ? "border-red-500" : ""
                }`}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="flex">
            <button
              type="button"
              className="border border-[#D3D3D3] w-full text-gray-700 font-semibold py-2 px-4 rounded-md mr-4"
              onClick={closePopup}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`w-full font-semibold py-2 px-4 rounded-md ${
                isFormComplete
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                  : "bg-[#F6F8FB] text-gray-500"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportantNumber;
