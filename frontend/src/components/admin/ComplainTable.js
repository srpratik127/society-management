import React from 'react';
import { ComplaintList } from '../../data/admindashbord';

const ComplainTable = () => {
    return (
        <div className="bg-white rounded-lg px-4 pt-2 w-[75%] my-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-semibold">Complaint List</h1>
                <div className="relative">
                    <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
                        <option>Week</option>
                        <option>Month</option>
                        <option>Year</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto max-h-48 overflow-y-auto">
                <table className="min-w-full bg-white">
                    <thead className="sticky top-0 bg-gray-100 z-10">
                        <tr className="text-left text-gray-600 text-sm uppercase font-medium">
                            <th className="py-3 px-4">Complainer Name</th>
                            <th className="py-3 px-4">Complaint Name</th>
                            <th className="py-3 px-8">Date</th>
                            <th className="py-3 px-5">Priority</th>
                            <th className="py-3 px-4">Complain Status</th>
                            <th className="py-3 px-14">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {ComplaintList.map((complaint, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-1 px-4 flex items-center space-x-3">
                                    <img
                                        src={complaint.complainerAvatar}
                                        alt={complaint.complainerName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span>{complaint.complainerName}</span>
                                </td>
                                <td className="py-3 px-4">{complaint.complaintName}</td>
                                <td className="py-3 px-4">{complaint.date}</td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`py-1 px-3 rounded-full text-white ${complaint.priority === 'High'
                                            ? 'bg-red-500'
                                            : complaint.priority === 'Medium'
                                                ? 'bg-blue-500'
                                                : 'bg-green-500'
                                            }`}
                                    >
                                        {complaint.priority}
                                    </span>
                                </td>
                                <td className="py-2 px-12">
                                    <span
                                        className={`py-1 px-3 rounded-full ${complaint.status === 'Open'
                                            ? 'bg-blue-100 text-blue-600'
                                            : complaint.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-green-100 text-green-600'
                                            }`}
                                    >
                                        {complaint.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button className="p-2 rounded-xl text-green-600">
                                        <img
                                            src="/assets/edit.svg"
                                            alt="Edit Icon"
                                            className="h-7 w-7 cursor-pointer"
                                        />
                                    </button>
                                    <button className="p-2 rounded-xl text-blue-600">
                                        <img
                                            src="/assets/showicon.svg"
                                            alt="Show Icon"
                                            className="h-7 w-7 cursor-pointer"
                                        />
                                    </button>
                                    <button className="p-2 rounded-xl text-red-600">
                                        <img
                                            src="/assets/delete.svg"
                                            alt="Delete Icon"
                                            className="h-7 w-7 cursor-pointer"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplainTable;
