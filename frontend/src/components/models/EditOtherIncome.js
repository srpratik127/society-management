import React from 'react'

const EditOtherIncome = ({ onClose  }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
                <h2 className="text-xl font-semibold">Ganesh Chturthi</h2>
                <form className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium">Amount</label>
                        <div className="flex border rounded-lg overflow-hidden">
                            <span className="flex items-center justify-center text-lg pl-3 py-2">₹</span>
                            <input
                                type="text"
                                placeholder=" 0000"
                                className="w-full pr-3 py-2 focus:outline-none  focus:outeline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Date</label>
                            <input
                                type="date"
                                placeholder='Select Date'
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:outeline-none"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Due Date</label>
                            <input
                                type="date"
                                placeholder='Select Date'
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:outeline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className='text-sm'>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            placeholder="Enter Description"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            required
                        />
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
    )
}

export default EditOtherIncome;
