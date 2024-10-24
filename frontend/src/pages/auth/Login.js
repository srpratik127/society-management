import React, { useState } from "react";
import { CreateSociety } from "../../components/models/CreateSociety";

export const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Email or Phone is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(emailOrPhone) &&
      !/^\d+$/.test(emailOrPhone)
    ) {
      newErrors.emailOrPhone = "Enter a valid email or phone number.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login successful", { emailOrPhone, password });
      setPassword("");
      setEmailOrPhone("");
      setShowPassword(false);
    }
  };

  const isFormValid =
    emailOrPhone && password && Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-10 border bg-white shadow rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="emailOrPhone"
            >
              Email or Phone<span className="text-[#E74C3C]">*</span>
            </label>
            <input
              type="text"
              id="emailOrPhone"
              className={`w-full px-4 py-2 border ${
                errors.emailOrPhone ? "border-[#E74C3C]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
              placeholder="Enter Your Phone Number Or Email"
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(e.target.value);
                if (errors.emailOrPhone) validate();
              }}
              required
            />
            {errors.emailOrPhone && (
              <p className="text-[#E74C3C] text-sm mt-1">
                {errors.emailOrPhone}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="password"
            >
              Password<span className="text-[#E74C3C]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-2 border ${
                  errors.password
                    ? "border-[#E74C3C]"
                    : "border-gray-300 focus:ring-1 focus:ring-slate-600"
                } rounded-md focus:outline-none `}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) validate();
                }}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
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
              <p className="text-[#E74C3C] text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 cursor-pointer text-gray-700"
              >
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-[#E74C3C] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-2 px-4 rounded-md ${
              isFormValid
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                : "bg-[#F6F8FB] text-[#A7A7A7]"
            }`}
            disabled={!isFormValid}
          >
            Sign In
          </button>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-red-500 hover:underline">
              Registration
            </a>
          </p>
        </form>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Open Popup
        </button>
        {isOpen && <CreateSociety closePopup={() => setIsOpen(false)} />}
      </div>
    </div>
  );
};
