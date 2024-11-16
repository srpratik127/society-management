import React from 'react';
import membersData from '../../data/userdetails/memberdata';

const MembersData = () => {
    return (
        <div className="p-4 m-6 mt-0 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
                Member : ({membersData.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {membersData.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md"
                    >
            
                        <div className="bg-[#5678E9] text-white rounded-t-lg p-2 font-semibold">
                            {member.name}
                        </div>
                  
                        <div className="p-3 text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium">Email</p>
                                <p className="truncate max-w-[10rem] text-right" title={member.email}>
                                    {member.email}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Phone Number</p>
                                <p className="truncate max-w-[10rem] text-right">
                                    {member.phone}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Age</p>
                                <p>{member.age}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Gender</p>
                                <p>{member.gender}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Relation</p>
                                <p>{member.relation}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersData;
