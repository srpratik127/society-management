import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const location = useLocation();
  const email = location.state?.emailOrPhone;
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgetpassword/otpmail`,
        {
          email: email,
        }
      );
      if (response.data) {
        console.log("mail sended in this mail : ", { email });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setErrorMessage("Please enter the complete OTP.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgetpassword/verify`,
        { otp: otpValue, email: email }
      );

      if (response.status === 200) {
        navigate("/reset");
        setErrorMessage("");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message ||
            "An error occurred during verification."
        );
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  const isOtpValid = otp.every((digit) => digit.length === 1);

  return (
    <div className="w-full max-w-lg p-10 bg-white shadow rounded-md">
      <h2 className="text-3xl font-bold mb-3 text-gray-800">Enter OTP</h2>
      <p className="text-gray-600 text-sm mb-4">
        Please enter the 6-digit code that was sent to your phone number.
      </p>
      <div className="flex space-x-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            placeholder="0"
            className={`w-12 h-12 border rounded-md text-center focus:outline-none  ${
              errorMessage
                ? "border-[#E74C3C]"
                : "border-gray-300 focus:ring-1 focus:ring-slate-600"
            }`}
            onChange={(e) => handleOtpChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="flex justify-between mt-4">
        <p className="text-gray-600 flex gap-2">
          <img src="/assets/clock.svg" alt="" />
          {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </p>
        <button
          disabled={isResendDisabled}
          onClick={handleResendOtp}
          className="text-[#E74C3C] hover:underline"
        >
          Resend OTP
        </button>
      </div>
      <button
        disabled={!isOtpValid}
        onClick={handleVerifyOtp}
        className={`w-full font-semibold py-2 mt-4 px-4 rounded-md ${
          isOtpValid
            ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
            : "bg-[#F6F8FB] text-[#A7A7A7]"
        }`}
      >
        Verify
      </button>
    </div>
  );
};

export default OtpScreen;
