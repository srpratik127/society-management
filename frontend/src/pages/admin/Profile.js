import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const handleUpdate = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex flex-col items-center h-auto relative">
        <div className="flex w-full absolute h-[80%] overflow-hidden">
          <img src="/assets/pngwing.png" className=" bg-[#a2b7fd] w-[50%]" />
          <img src="/assets/pngwing.png" className=" bg-[#a2b7fd] w-[50%]" />
        </div>
        <div className="w-[65%] max-w-[1200px] translate-y-44 bg-white rounded-xl shadow-md p-6 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">
              {isEditing ? "Edit Profile" : "Profile"}
            </h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg"
              >
                <span className="material-icons mr-2">edit</span> Edit Profile
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center md:col-span-1">
              <div className="relative w-32 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src="/assets/Ellipse.png"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-1 rounded-full text-white hover:bg-opacity-75">
                    <span className="material-icons">photo_camera</span>
                  </button>
                )}
              </div>
              <h2 className="mt-4 text-xl font-medium">Arlene McCoy</h2>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4 ">
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="firstName">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  disabled={!isEditing}
                  defaultValue="Arlene"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  disabled={!isEditing}
                  defaultValue="McCoy"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="phoneNumber">
                  Phone Number*
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  disabled={!isEditing}
                  defaultValue="+91 93130 44537"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="email">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  disabled={!isEditing}
                  defaultValue="ArleneMcCoy25@gmail.com"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="society">
                  Select Society*
                </label>
                <input
                  type="text"
                  id="society"
                  disabled={!isEditing}
                  defaultValue="Shantigram residency"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="country">
                  Country*
                </label>
                <input
                  type="text"
                  id="country"
                  disabled={!isEditing}
                  defaultValue="McCoy"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="state">
                  State*
                </label>
                <input
                  type="text"
                  id="state"
                  disabled={!isEditing}
                  defaultValue="Gujarat"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-medium mb-1" htmlFor="city">
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  disabled={!isEditing}
                  defaultValue="Baroda"
                  className={`w-full bg-white border  p-2 rounded-md`}
                />
              </div>
              {isEditing && (
                <div className="col-span-2 flex justify-end mt-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md"
                  >
                    Update Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
