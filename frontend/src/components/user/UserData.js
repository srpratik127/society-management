import React from "react";
import { useSelector } from "react-redux";

const UserData = () => {
  const user = useSelector((store) => store.auth.user);

  return (
    <div className="m-6">
      <div className="p-6 bg-white shadow rounded-lg flex flex-col md:flex-row space-y-6 md:space-y-0 items-center md:space-x-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-full h-full object-cover border-2"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
            {[
              { label: "Full Name", value: user.fullName },
              { label: "Phone Number", value: user.phone },
              { label: "Email Address", value: user.email },
              { label: "Gender", value: user.gender },
              { label: "Wing", value: user.wing },
              { label: "Age", value: user.age },
              { label: "Unit", value: user.unit },
              { label: "Relation", value: user.relation },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center md:text-left border md:border-none p-3 rounded-lg md:p-0"
              >
                <span className="font-semibold">{item.label}</span>
                <p className="text-gray-500 break-words">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/4 space-y-4">
          {[
            {
              label: "Aadhar Front",
              src: "/assets/blueGallary.svg",
              fileName: user.aadharCardFront,
            },
            {
              label: "Aadhar Back",
              src: "/assets/blueGallary.svg",
              fileName: user.aadharCardBack,
            },
          ].map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md space-x-3"
            >
              <div className="flex items-center gap-3">
                <img src={doc.src} alt={doc.label} className="w-8 h-8" />
                <div>
                  <p className="text-sm text-gray-900 break-all">
                    {`...${doc.fileName.slice(-33)}`}
                  </p>
                  <p className="text-gray-500 text-xs">20MB</p>
                </div>
              </div>
              <button
                className="ml-auto"
                onClick={() =>
                  window.open(
                    doc.fileName,
                    "_blank",
                    "width=800,height=600, left=500, top=200"
                  )
                }
              >
                <img
                  src="/assets/eye.svg"
                  alt=""
                  className="h-6 w-6 text-gray-400"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserData;
