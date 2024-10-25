import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateSociety } from "../../components/models/CreateSociety";
import Select from "react-select";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    society: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    selectedOption.value === "create_society"
      ? setIsOpen(true)
      : setFormData((prev) => ({ ...prev, society: selectedOption }));
  };

  const validate = () => {
    const newErrors = {};
    [
      "firstname",
      "lastname",
      "email",
      "phone",
      "country",
      "state",
      "city",
      "society",
      "password",
    ].forEach((field) => {
      if (!formData[field])
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
    });
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) setErrors(validationErrors);
    else {
      console.log("Form submitted:", formData);
      setErrors({});
    }
  };

  const options = [
    { value: "shantigram_residency", label: "Shantigram Residency" },
    { value: "russett_house_park", label: "Russett House Park" },
    { value: "saurya_residency", label: "Saurya Residency" },
    { value: "create_society", label: "Create Society", isButton: true },
  ];

  const CustomOption = ({ data, innerRef, innerProps }) =>
    data.isButton ? (
      <div
        ref={innerRef}
        {...innerProps}
        onClick={() => setIsOpen(true)}
        className="text-white text-center font-semibold cursor-pointer py-2 px-4 mx-1 rounded-md"
        style={{ background: "linear-gradient(to right, #FE512E, #F09619)" }}
      >
        {data.label}
      </div>
    ) : (
      <div ref={innerRef} {...innerProps} className="cursor-pointer px-4 py-2">
        {data.label}
      </div>
    );

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-11 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-left">
          Registration
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="first name"
                className={`w-full px-4 py-2 border ${
                  errors.firstname
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="last name"
                className={`w-full px-4 py-2 border ${
                  errors.lastname
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email address"
                className={`w-full px-4 py-2 border ${
                  errors.email
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="phone number"
                className={`w-full px-4 py-2 border ${
                  errors.phone
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="country"
                className={`w-full px-4 py-2 border ${
                  errors.country
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="state"
                className={`w-full px-4 py-2 border ${
                  errors.state
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="city"
                className={`w-full px-4 py-2 border ${
                  errors.city
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="society"
              className="block text-sm font-medium text-gray-700"
            >
              Select Society<span className="text-red-500">*</span>
            </label>
            <Select
              name="society"
              value={formData.society}
              onChange={handleSelectChange}
              options={options}
              components={{ Option: CustomOption }}
              placeholder="Select Society"
            />
            {errors.society && (
              <p className="text-red-500 text-sm">{errors.society}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border ${
                  errors.password
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                <img
                  src={
                    showPassword ? "/assets/eye.svg" : "/assets/eye-slash.svg"
                  }
                  alt="Toggle Password Visibility"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword
                    ? "border-[#E74C3C] focus:ring-0"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                <img
                  src={
                    showConfirmPassword
                      ? "/assets/eye.svg"
                      : "/assets/eye-slash.svg"
                  }
                  alt="Toggle Password Visibility"
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
              I agree to all the Terms and{" "}
              <a href="#" className="text-red-500">
                Privacy Policies
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-[#A7A7A7] font-semibold rounded-md bg-[#F6F8FB] focus:outline-none"
          >
            Register
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#E74C3C]">
              Login
            </Link>
          </p>
        </form>
      </div>

      {isOpen && <CreateSociety closePopup={() => setIsOpen(false)} />}
    </div>
  );
};

export default Register;
