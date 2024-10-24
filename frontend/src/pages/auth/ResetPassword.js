import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords must match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Reset successful", { password });
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
    }
  };

  const isFormValid = password && confirmPassword && validate;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-10 border bg-white shadow rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="password"
            >
              New Password<span className="text-[#E74C3C]">*</span>
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

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password<span className="text-[#E74C3C]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword
                    ? "border-[#E74C3C]"
                    : "border-gray-300 focus:ring-1 focus:ring-slate-600"
                } rounded-md focus:outline-none `}
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) validate();
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
            {errors.confirmPassword && (
              <p className="text-[#E74C3C] text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
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
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;