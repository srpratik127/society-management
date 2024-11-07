import React from "react";

const ViewResident = ({ onClose, selectResidents }) => {
  return (
    <div className="fixed inset-0 flex items-end justify-end z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-[#F0F5FB] px-6 py-4 rounded-lg shadow-lg z-10 w-full max-w-lg overflow-y-auto h-full">
        <div className="flex items-center mb-4 gap-6">
          <button
            onClick={onClose}
            className="text-gray-500 text-2xl border rounded-full h-10 w-10"
          >
            &#10094;
          </button>
          <h3 className="text-xl font-semibold">
            View {selectResidents.role} Details
          </h3>
        </div>
        <div className="flex flex-col items-center space-x-4 mb-6 mt-10">
          <img
            src={selectResidents.profile_picture}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <h2 className="text-xl font-semibold mt-4">
            {selectResidents.fullName}
          </h2>
          <p className="text-gray-500 mt-1">{selectResidents.email}</p>
        </div>
        <div className="space-y-4 mb-6 bg-[white] p-4 rounded-xl">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Wing</span>
            <span className="text-[#4F4F4F]">{selectResidents.wing}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Unit</span>
            <span className="text-[#4F4F4F]">{selectResidents.unit}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Age</span>
            <span className="text-[#4F4F4F]">{selectResidents.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gender</span>
            <span className="text-[#4F4F4F]">{selectResidents.gender}</span>
          </div>
        </div>
        <div className="mb-6 bg-[white] p-4 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Documents</h3>
          <div className="flex items-center justify-between p-2 border rounded-md mb-2">
            <span>Adharcard Front Side.JPG</span>
            <span className="text-sm text-gray-500">3.5 MB</span>
          </div>
          <div className="flex items-center justify-between p-2 border rounded-md">
            <span>Address Proof Front Side.PDF</span>
            <span className="text-sm text-gray-500">2.3 MB</span>
          </div>
        </div>
        {selectResidents.role === "tenant" && (
          <div className="rounded-xl">
            <div className="text-white bg-[#5678E9] p-3 rounded-t-xl">
              <h3 className="font-semibold text-lg">Owner Details</h3>
            </div>
            <div className="space-y-2 p-4 border rounded-xl">
              <div className="space-y-4 bg-[white] p-4 rounded-xl">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Name</span>
                  <span className="text-[#4F4F4F]">{selectResidents.ownerfullname}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Phone</span>
                  <span className="text-[#4F4F4F]">{selectResidents.ownerphone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Address</span>
                  <span className="text-[#4F4F4F]">{selectResidents.owneraddress}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="rounded-xl">
          <div className="flex justify-between items-center text-white bg-[#5678E9] p-3 rounded-t-xl">
            <h3 className="font-semibold text-lg">Member Counting</h3>
            <p>0{selectResidents.members?.length}</p>
          </div>
          <div className="space-y-2 p-4 border rounded-xl">
            {selectResidents.members?.map((member) => (
              <div className="space-y-4 bg-[white] p-4 rounded-xl">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">First Name</span>
                  <span className="text-[#4F4F4F]">{member.fullName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Phone No</span>
                  <span className="text-[#4F4F4F]">{member.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Age</span>
                  <span className="text-[#4F4F4F]">{member.age}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Gender</span>
                  <span className="text-[#4F4F4F]">{member.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Relation</span>
                  <span className="text-[#4F4F4F]">{member.relation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResident;
