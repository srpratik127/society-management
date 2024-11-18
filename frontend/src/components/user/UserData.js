import React from "react";
import { userdata } from "../../data/userdetails/userdata";

const UserData = () => {
  const {
    fullName,
    phoneNumber,
    email,
    wing,
    age,
    unit,
    gender,
    relation,
    documents,
  } = userdata;

  return (
    <div className="m-6">
      <div className="flex flex-wrap items-center p-6 bg-white  shadow rounded-lg w-full space-y-6 md:space-y-0">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/assets/Ellipse.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 px-4 mt-4 md:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Full Name</span>
              <p className="text-gray-500">{fullName}</p>
            </div>
            <div>
              <span className="font-semibold">Phone Number</span>
              <p className="text-gray-500">{phoneNumber}</p>
            </div>
            <div>
              <span className="font-semibold">Email Address</span>
              <p className="text-gray-500 break-words">{email}</p>
            </div>
            <div>
              <span className="font-semibold">Gender</span>
              <p className="text-gray-500">{gender}</p>
            </div>
            <div>
              <span className="font-semibold">Wing</span>
              <p className="text-gray-500">{wing}</p>
            </div>
            <div>
              <span className="font-semibold">Age</span>
              <p className="text-gray-500">{age}</p>
            </div>
            <div>
              <span className="font-semibold">Unit</span>
              <p className="text-gray-500">{unit}</p>
            </div>
            <div>
              <span className="font-semibold">Relation</span>
              <p className="text-gray-500">{relation}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center p-3 border border-gray-200 rounded-md space-x-3"
            >
              <img
                src="/assets/blueGallary.svg"
                alt="Document"
                className="w-8 h-8"
              />
              <div>
                <p className="text-gray-700 text-xs">{doc.name}</p>
                <p className="text-gray-500 text-xs">{doc.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserData;
