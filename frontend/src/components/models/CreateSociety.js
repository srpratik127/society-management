import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const CreateSociety = ({ closePopup, setOptions }) => {
  const [societyName, setSocietyName] = useState("");
  const [societyAddress, setSocietyAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", {
        societyName,
        societyAddress,
        country,
        state,
        city,
        zipCode,
      });
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/society`,
        {
          name: societyName,
          address: societyAddress,
          country,
          state,
          city,
          zipCode,
        }
      );
      const { name } = response.data;
      setOptions((prev) => [...prev, { value: name, label: name }]);
      toast.success("Society Create successful!");
      closePopup();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const allFieldsFilled =
    societyName && societyAddress && country && state && city && zipCode;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
        <h2 className="text-xl font-semibold mb-6">Create New Society</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="societyName" className="block text-sm font-medium">
              Society Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="societyName"
              name="societyName"
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
              className={`mt-1 block w-full rounded-lg p-2 border outline-none focus:ring-slate-900 focus:border-slate-900 ${
                errors.societyName ? "border-red-500" : ""
              }`}
              placeholder="Enter Name"
            />
            {errors.societyName && (
              <p className="text-red-500 text-xs">{errors.societyName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="societyAddress"
              className="block text-sm font-medium"
            >
              Society Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="societyAddress"
              name="societyAddress"
              value={societyAddress}
              onChange={(e) => setSocietyAddress(e.target.value)}
              className={`mt-1 block w-full rounded-lg p-2 border outline-none focus:ring-slate-900 focus:border-slate-900 ${
                errors.societyAddress ? "border-red-500" : ""
              }`}
              placeholder="Enter Address"
            />
            {errors.societyAddress && (
              <p className="text-red-500 text-xs">{errors.societyAddress}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`mt-1 block w-full rounded-lg p-2 border outline-none focus:ring-slate-900 focus:border-slate-900 ${
                  errors.country ? "border-red-500" : ""
                }`}
                placeholder="Enter Country"
              />
              {errors.country && (
                <p className="text-red-500 text-xs">{errors.country}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`mt-1 block w-full rounded-lg p-2 border outline-none focus:ring-slate-900 focus:border-slate-900 ${
                  errors.state ? "border-red-500" : ""
                }`}
                placeholder="Enter State"
              />
              {errors.state && (
                <p className="text-red-500 text-xs">{errors.state}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`mt-1 block w-full rounded-lg p-2 border outline-none focus:ring-slate-900 focus:border-slate-900 ${
                  errors.city ? "border-red-500" : ""
                }`}
                placeholder="Enter City"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={`mt-1 block w-full rounded-lg p-2 border outline-none focus:ring-slate-900 focus:border-slate-900 ${
                  errors.zipCode ? "border-red-500" : ""
                }`}
                placeholder="Enter Zip Code"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={closePopup}
              className="px-4 py-2 text-gray-600 border w-full border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 w-full  font-bold rounded-lg ${
                allFieldsFilled
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              disabled={!allFieldsFilled}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
