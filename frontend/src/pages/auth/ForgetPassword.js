import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Email is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(emailOrPhone) &&
      !/^\d+$/.test(emailOrPhone)
    ) {
      newErrors.emailOrPhone = "Enter a valid email.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/api/forget-password/otpmail`,
          {
            email: emailOrPhone,
          }
        );

        if (response.data) {
          console.log("Forget Password Email", { emailOrPhone });
          toast.success("Email Sended successful!");
          setEmailOrPhone("");
          navigate("/get-otp", { state: { emailOrPhone } });
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const isFormValid = emailOrPhone && Object.keys(errors).length === 0;

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg p-10 bg-white shadow rounded-md mx-auto">
    <h2 className="text-3xl font-bold mb-3 text-gray-800">Forget Password</h2>
    <p className="text-[#4F4F4F] text-sm mb-4">
      Enter your email and we’ll send you a otp to reset your password.
    </p>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-1"
          htmlFor="emailOrPhone"
        >
          Email <span className="text-[#E74C3C]">*</span>
        </label>
        <input
          type="text"
          id="emailOrPhone"
          className={`w-full px-4 py-2 border ${
            errors.emailOrPhone ? "border-[#E74C3C]" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
          placeholder="Enter Your Email"
          value={emailOrPhone}
          onChange={(e) => {
            setEmailOrPhone(e.target.value);
            if (errors.emailOrPhone) validate();
          }}
          required
        />
        {errors.emailOrPhone && (
          <p className="text-[#E74C3C] text-sm mt-1">{errors.emailOrPhone}</p>
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
        <Link to="/login" className="text-red-500 hover:underline">
          Back to Login
        </Link>
      </p>
    </form>
  </div>
  );
};
export default ForgetPassword;
