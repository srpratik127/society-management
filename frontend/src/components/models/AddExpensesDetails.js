import React, { useRef, useState } from 'react';

const AddExpensesDetails = ({ onClose }) => {
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const dateInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleDateIconClick = () => {
        dateInputRef.current.showPicker();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Add Expenses Details</h2>
                <hr className="mb-4" />

                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="title">Title<span className="text-red-500">*</span></label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter Title"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none "
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="description">Description<span className="text-red-500">*</span></label>
                    <textarea
                        id="description"
                        placeholder="Enter Description"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none "
                        required
                    />
                </div>
                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="text-sm font-medium" htmlFor="date">Date<span className="text-red-500">*</span></label>
                        <div className="relative mt-1">
                            <input
                                id="date"
                                type="date"
                                ref={dateInputRef}
                                className="block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none "
                                required
                            />
                            <span
                                className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                onClick={handleDateIconClick}
                            >
                                <img src="/assets/calendar.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium" htmlFor="amount">Amount<span className="text-red-500">*</span></label>
                        <input
                            id="amount"
                            type="text"
                            placeholder="₹ 0000"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="upload">Upload Bill<span className="text-red-500">*</span></label>
                    <div
                        className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                        onClick={handleFileClick} >
                        {fileName ? (
                            <div>
                                <p className="mt-2 text-sm text-gray-700 font-medium">{fileName}</p>
                                <p className='text-[#39973D]'>File Uploaded Successfully</p>
                            </div>

                        ) : (
                           <div>
                             <p className="mt-2 text-sm text-blue-500 font-medium">Upload a file</p>
                             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                           </div>
                        )}
                    </div>
                    <input
                        id="upload"
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        className="w-1/2 bg-gray-200 text-gray-700 rounded-lg py-2 mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="w-1/2 bg-blue-500 text-white rounded-lg py-2 ml-2">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddExpensesDetails;
