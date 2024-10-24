import React, { useState } from "react";

const ForgetPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Forget Password Email", { emailOrPhone });
      setEmailOrPhone("");
    }
  };

  const isFormValid = emailOrPhone && Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-10 border bg-white shadow rounded-md">
        <h2 className="text-3xl font-bold mb-3 text-gray-800">
          Forget Password
        </h2>
        <p className="text-[#4F4F4F] text-sm mb-4">
          Enter your email and we’ll send you a otp to reset your password.
        </p>
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

          <button
            type="submit"
            className={`w-full font-semibold py-2 mt-4 px-4 rounded-md ${
              isFormValid
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                : "bg-[#F6F8FB] text-[#A7A7A7]"
            }`}
            disabled={!isFormValid}
          >
            Get OTP
          </button>

          <p className="mt-4 text-center text-gray-600">
            <a href="#" className="text-red-500 hover:underline">
              Back to Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;
