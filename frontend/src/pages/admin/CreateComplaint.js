import React from 'react';
import { complaintData } from '../../data/complaint';

const CreateComplaint = () => {
    return (
        <div className="p-6 bg-gray-50 m-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Create Complaint</h2>
                <button className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg">
                    Create Complaint
                </button>
            </div>
            <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#d0d9f7] text-black">
                    <tr>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Complainer Name</th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Complaint Name</th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Description</th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Unit Number</th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Priority</th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Status</th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-600 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complaintData.map((entry, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-4 text-gray-700 flex ">
                                <img src="/assets/Avatar.png" className='px-3' alt="" />
                                {entry.name}
                            </td>
                            <td className="py-3 px-4 text-gray-700 text-center">{entry.complaintName}</td>
                            <td className="py-3 px-4 text-gray-700 text-center">{entry.description}</td>
                            <td className="py-3 px-4 text-gray-700 text-center"><span className='px-2 text-[#5678E9] bg-[#F6F8FB] rounded-full'>{entry.wing}</span>{entry.unitNumber}</td>
                            <td className="py-3 px-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-white text-sm ${entry.priority === 'High' ? 'bg-red-500' :
                                    entry.priority === 'Medium' ? 'bg-blue-500' : 'bg-green-500'
                                    }`}>
                                    {entry.priority}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <span
                                    className={`w-20 px-3 py-1 rounded-full text-sm text-gray-800 text-center ${entry.status === 'Pending' ? 'bg-yellow-300' :
                                        entry.status === 'Open' ? 'bg-blue-200' : 'bg-green-200'
                                        }`}
                                >
                                    {entry.status}
                                </span>
                            </td>

                            <td className="py-3 px-4 flex space-x-3">
                                <button className="text-green-500 hover:text-green-700">
                                    <img src="/assets/edit.svg" alt="" />
                                </button>
                                <button className="text-blue-500 hover:text-blue-700">
                                    <img src="/assets/blueeye.svg" alt="" />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <img src="/assets/delete.svg" alt="" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateComplaint;
