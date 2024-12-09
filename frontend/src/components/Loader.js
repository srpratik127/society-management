import React from "react";

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "-webkit-fill-available" }}
    >
      <div className="w-6 h-6 border-4 border-t-[#FE512E] border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
