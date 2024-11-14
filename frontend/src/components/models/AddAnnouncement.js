import React, { useState } from 'react';

const AddAnnouncement = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
    });
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        date: false,
        time: false,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: !value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            title: !formData.title,
            description: !formData.description,
            date: !formData.date,
            time: !formData.time,
        };
        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((error) => error);
        if (!hasErrors) {
            console.log('Announcement Data:', formData);
            onClose();
        }
    };
    const isSaveDisabled =
        !formData.title || !formData.description || !formData.date || !formData.time;
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[410px] h-auto">
                <h2 className="text-xl font-semibold mb-4">Add Announcement</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Announcement Title*</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            name="title"
                            className={`w-full border p-2 rounded mt-2 ${
                                errors.title ? 'border-red-500' : ''
                            }`}
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">Title is required</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block">Description*</label>
                        <textarea
                            name="description"
                            placeholder="Enter Description"
                            className={`w-full border p-2 rounded mt-2 ${
                                errors.description ? 'border-red-500' : ''
                            }`}
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">Description is required</p>
                        )}
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div>
                            <label className="block font-poppins text-[14px] text-nowrap">
                                Announcement Date*
                            </label>
                            <input
                                type="date"
                                name="date"
                                className={`w-[175px] border-[1px] p-2 rounded-md mt-2 ${
                                    errors.date ? 'border-red-500' : ''
                                }`}
                                value={formData.date}
                                onChange={handleChange}
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">Date is required</p>
                            )}
                        </div>
                        <div>
                            <label className="block font-poppins text-[14px] text-nowrap">
                                Announcement Time*
                            </label>
                            <input
                                type="time"
                                name="time"
                                className={`w-[175px] border-[1px] p-2 rounded-md mt-2 ${
                                    errors.time ? 'border-red-500' : ''
                                }`}
                                value={formData.time}
                                onChange={handleChange}
                            />
                            {errors.time && (
                                <p className="text-red-500 text-sm mt-1">Time is required</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="border border-[#D3D3D3] w-[175px] text-[#202224] font-semibold py-2 px-4 rounded-md mr-4"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-[175px] font-semibold py-2 px-4 rounded-md ${
                                isSaveDisabled
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white'
                            }`}
                            disabled={isSaveDisabled}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAnnouncement;
