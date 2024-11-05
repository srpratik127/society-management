import React, { useState } from "react";
import { residents } from "../../data/residentdata";
import ResidenceStatus from "../../components/models/ResidenceStatus";

const Resident = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  const handleEditClick = (resident) => {
    setSelectedResident(resident);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedResident(null);
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">
            Resident Tenant and Owner Details
          </h2>
          <button className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white font-bold py-2 px-4 rounded mb-4 flex">
            <span className="pr-2">
              <img src="/assets/add-square.svg" />
            </span>
            Add New Resident Details
          </button>
        </div>

        <table className="min-w-full bg-white">
          <thead className="bg-[#5678E9] bg-opacity-10">
            <tr>
              <th className="py-3 px-8 text-start">Full Name</th>
              <th className="py-3 px-4">Unit Number</th>
              <th className="py-3 px-4">Unit Status</th>
              <th className="py-3 px-4">Resident Status</th>
              <th className="py-3 px-4 text-start">Phone Number</th>
              <th className="py-3 px-4">Member</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.id} className="border-t mx-auto">
                <td className="py-4 px-4 flex items-center">
                  {resident.name && resident.name.trim() !== "-" ? (
                    <>
                      <span className="mr-2">
                        <img
                          src="/assets/Avatar.png"
                          alt={`${resident.name}'s Avatar`}
                          className="h-8 w-8"
                        />
                      </span>
                      {resident.name}
                    </>
                  ) : (
                  <>
                    <span className="mr-2">
                          <img src="/assets/empty.png"
                            alt="Empty Avatar"
                            className="h-8 w-8"/>
                        </span>
                    <span>-</span>
                  </>
                  )}
                </td>
                <td className="text-center">
                  <span className="p-2 text-[#5678E9] bg-[#F6F8FB] font-semibold py-1 rounded-full">
                    {resident.unit}
                  </span>
                  <span>{resident.unitNumber}</span>
                </td>
                <td className="py-2 flex justify-center text-center">
                  {resident.unitStatus !== "-" ? (
                    <span
                      className={`flex items-center ${resident.unitStatus === "Occupied"
                          ? "text-[#14B8A6] font-semibold py-2 px-3 rounded-full bg-[#ECFFFF]"
                          : "text-[#9333EA] font-semibold py-2 px-3 rounded-full bg-[#FFF6FF]"
                        }`}
                    >
                      <img
                        src={
                          resident.unitStatus === "Occupied"
                            ? "/assets/occupied.svg"
                            : "/assets/vacate.svg"
                        }
                        alt={
                          resident.unitStatus === "Occupied"
                            ? "Occupied Icon"
                            : "Vacant Icon"
                        }
                        className="h-5 w-5 mr-2"
                      />
                      {resident.unitStatus}
                    </span>
                  ) : (
                    <span className="bg-[#F6F8FB] rounded-full px-3">--</span>
                  )}
                </td>
                <td className="text-center">
                  {resident.residentStatus !== "--" ? (
                    <span
                      className={`flex items-center justify-center ${resident.residentStatus === "Tenant"
                          ? "text-[#EC4899] font-semibold py-2 px-4 rounded-full bg-[#ECFFFF]"
                          : "text-[#4F46E5] font-semibold py-2 px-4 rounded-full bg-[#FFF6FF]"
                        }`}
                    >
                      <img
                        src={
                          resident.residentStatus === "Owner"
                            ? "/assets/owner.svg"
                            : "/assets/user.svg"
                        }
                        alt={
                          resident.residentStatus === "Owner"
                            ? "Owner Icon"
                            : "User Icon"
                        }
                        className="h-5 w-5 mr-2"
                      />
                      {resident.residentStatus}
                    </span>
                  ) : (
                    <span className="bg-[#F6F8FB] rounded-full px-3">--</span>
                  )}
                </td>
                <td className="py-2 px-4">{resident.phone}</td>
                <td className="py-2 text-center">
                  <span className="bg-[#F6F8FB] px-2 py-1 rounded-full">
                    {resident.member}
                  </span>
                </td>
                <td className="py-2 text-center">
                  <span className="bg-[#F6F8FB] px-2 py-1 rounded-full">
                    {resident.vehicle}
                  </span>
                </td>
                <td className="py-2 px-4 flex justify-center">
                  {resident.name && resident.name.trim() !== "-" ? (
                    <>
                      <button
                        className="text-green-500 hover:text-green-700 px-2"
                        aria-label={`Edit ${resident.name}`}
                        onClick={() => handleEditClick(resident)}
                      >
                        <img
                          src="/assets/edit.svg"
                          alt="Edit"
                          className="h-8 w-8"
                        />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 px-2"
                        aria-label={`View ${resident.name}`}
                      >
                        <img
                          src="/assets/blueeye.svg"
                          alt="View"
                          className="h-8 w-8"
                        />
                      </button>
                    </>
                  ) : (
                    <span className="bg-[#F6F8FB] rounded-full px-3">--</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && <ResidenceStatus resident={selectedResident} onClose={closePopup}/>}
    </div>
  );
};

export default Resident;
