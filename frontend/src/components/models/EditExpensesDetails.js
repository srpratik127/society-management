import React, { useRef, useState } from 'react'

const EditExpensesDetails = ({ onClose }) => {
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});
    
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

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Title is required";
        if (!description) newErrors.description = "Description is required";
        if (!date) newErrors.date = "Date is required";
        if (!amount) newErrors.amount = "Amount is required";
        if (!fileName) newErrors.fileName = "File upload is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully");
            onClose(); 
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Edit Expenses Details</h2>
                <hr className="mb-4" />

                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="title">Title<span className="text-red-500">*</span></label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="description">Description<span className="text-red-500">*</span></label>
                    <textarea
                        id="description"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="text-sm font-medium" htmlFor="date">Date<span className="text-red-500">*</span></label>
                        <div className="relative mt-1">
                            <input
                                id="date"
                                type="date"
                                ref={dateInputRef}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                            />
                            <span
                                className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                onClick={handleDateIconClick}
                            >
                                <img src="/assets/calendar.svg" alt="" />
                            </span>
                        </div>
                        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium" htmlFor="amount">Amount<span className="text-red-500">*</span></label>
                        <input
                            id="amount"
                            type="text"
                            placeholder="₹ 0000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
                        />
                        {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="upload">Upload Bill<span className="text-red-500">*</span></label>
                    <div
                        className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                        onClick={handleFileClick}
                    >
                        {fileName ? (
                            <div>
                                <p className="mt-2 text-sm text-gray-700 font-medium">{fileName}</p>
                                <p className='text-[#39973D]'>File Uploaded Successfully</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <img src="/assets/addPhoto.svg" alt="" className="h-6 w-6" />
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
                    />
                    {errors.fileName && <p className="text-red-500 text-xs">{errors.fileName}</p>}
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        className="w-1/2 bg-gray-200 text-gray-700 rounded-lg py-2 mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg py-2 ml-2"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditExpensesDetails
