import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return (
          <div className="hidden lg:block">
            <img
              src="/assets/register.JPEG"
              alt="Registration"
              className="w-full max-w-xl"
            />
            <p className="mt-6 text-2xl text-center text-gray-600 font-medium">
              Connect, Collaborate, and Control –
              <span className="text-[#FE512E] font-semibold">
                Society <br />
                Management{" "}
              </span>
              Simplified
            </p>
          </div>
        );
      case "/login":
        return (
          <div className="hidden md:block">
            <img
              src="/assets/login-bg.png"
              alt="Login"
              className="w-full max-w-xl "
            />
            <p className="mt-6 text-2xl text-center text-gray-600 font-medium">
              Your Space, Your Place:
              <span className="text-[#FE512E] font-semibold">
                Society Management
              </span>
              <br />
              Made Simple.
            </p>
          </div>
        );
      case "/forget":
      case "/get-otp":
      case "/reset":
        return (
          <img
            src="/assets/reset-password-bg.png"
            alt="Reset Password"
            className="w-full max-w-xl"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full justify-center md:w-full relative">
      <div className="absolute right-0 h-screen overflow-hidden -z-50">
        <img src="/assets/background.png" alt="Background" />
      </div>

      <div className="w-1/2 h-screen overflow-hidden bg-[#F6F8FB] hidden lg:block">
        <img src="/assets/logo.png" className="w-60 px-9 mt-6" alt="Logo" />
        <div className="flex flex-col min-h-screen items-center justify-center">
          {renderContent()}
        </div>
      </div>
      <div className="flex  md:w-2/2 w-1/2 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full min-h-screen flex mx-auto justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>

  );
};

export default Main;
