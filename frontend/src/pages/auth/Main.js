import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex justify-center relative">
      <div className="absolute right-0 h-screen overflow-hidden -z-50">
        <img src="/assets/background.png" />
      </div>
      <div className="w-1/2 h-screen overflow-hidden bg-[#F6F8FB]">
        <img src="/assets/logo.png" className="w-60 px-9 mt-6" />
        <div className="flex flex-col min-h-screen items-center justify-center ">
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
      </div>
      <div className="w-1/2  ">
        <div className="flex justify-center items-center min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
