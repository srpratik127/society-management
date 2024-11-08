import React, { useState } from 'react';

const CreateOtherIncome = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    
    const [errors, setErrors] = useState({
        title: '',
        date: '',
        dueDate: '',
        description: '',
        amount: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let formErrors = {};
        if (!title) formErrors.title = 'Title is required';
        if (!date) formErrors.date = 'Date is required';
        if (!dueDate) formErrors.dueDate = 'Due Date is required';
        if (!description) formErrors.description = 'Description is required';
        if (!amount) formErrors.amount = 'Amount is required';

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
                <h2 className="text-xl font-semibold">Create Other Income</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.date ? 'border-red-500' : ''}`}
                            />
                            {errors.date && <span className="text-sm text-red-500">{errors.date}</span>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.dueDate ? 'border-red-500' : ''}`}
                            />
                            {errors.dueDate && <span className="text-sm text-red-500">{errors.dueDate}</span>}
                        </div>
                    </div>
                    <div className='text-sm'>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Amount</label>
                        <div className="flex border rounded-lg overflow-hidden">
                            <span className="flex items-center justify-center text-lg pl-3 py-2">₹</span>
                            <input
                                type="text"
                                placeholder=" 0000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={`w-full pr-3 py-2 focus:outline-none ${errors.amount && 'border-red-500'}`}
                            />
                        </div>
                        {errors.amount && <span className="text-sm text-red-500">{errors.amount}</span>}
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateOtherIncome;
