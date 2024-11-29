import React from "react";
import { useSelector } from "react-redux";

const MembersData = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div className="p-4 m-6 mt-0 bg-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Member : (0{user?.members?.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {user?.members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-[#5678E94D]"
          >
            <div className="bg-[#5678E9] text-white rounded-t-lg p-2 ">
              {member.fullName}
            </div>

            <div className="p-3 space-y-2">
              <div className="flex justify-between">
                <p className="text-[#4F4F4F]">Email</p>
                <p
                  className="truncate font-medium max-w-[10rem] text-right"
                  title={member.email}
                >
                  {member.email}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#4F4F4F]">Phone Number</p>
                <p className="truncate font-medium max-w-[10rem] text-right ">
                  {member.phone}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#4F4F4F]">Age</p>
                <p className="font-medium">{member.age}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#4F4F4F]">Gender</p>
                <p className="font-medium">{member.gender}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#4F4F4F]">Relation</p>
                <p className="font-medium">{member.relation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersData;
