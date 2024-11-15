import React from "react";

const ViewSecurity = ({ guard, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">View Security Guard Details</h2>
          <button onClick={onClose}>
            <img src="/assets/cross.svg" alt="Close" />
          </button>
        </div>
        <div className="flex items-center mb-4 py-2">
          <img
            src={guard.profile_photo || "/assets/Avatar.png"}
            className="w-[70px] h-[70px] rounded-full mr-3 border-[2px]"
            alt="Guard avatar"
          />
          <div>
            <h3 className="font-semibold">{guard.fullName}</h3>
            <p className="text-gray-500 text-sm">
              {new Date(guard.shiftDate).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col items-start py-1">
            <span className="font-Poppins text-[#A7A7A7] px-2 ">
              Select Shift
            </span>
            <span className="inline-block py-1 text-sm font-medium rounded-full">
              {guard.shift === "Day" ? (
                <img src="/assets/clips.png" alt="Day Shift" />
              ) : guard.shift === "Night" ? (
                <img src="/assets/clips.1.png" alt="Night Shift" />
              ) : (
                <span>No shift information available</span>
              )}
            </span>
          </div>
          <div className="flex flex-col items-center py-1 pb-2">
            <span className="font-Poppins text-[#A7A7A7] ">Shift Time</span>
            <span className="text-sm black py-3">{guard.shiftTime}</span>
          </div>
          <div className="flex flex-col items-center py-1 pb-2">
            <span className="font-Poppins text-[#A7A7A7] ">Gender</span>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full">
              {guard.gender === "Male" ? (
                <img src="/assets/male.png" alt="Male" />
              ) : (
                <img src="/assets/female.png" alt="Female" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSecurity;
