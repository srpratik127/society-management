import React from 'react'

const AddExpensesDetails = () => {
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
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="description">Description<span className="text-red-500">*</span></label>
                    <textarea
                        id="description"
                        placeholder="Enter Description"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="text-sm font-medium" htmlFor="date">Date<span className="text-red-500">*</span></label>
                        <div className="relative mt-1">
                            <input
                                id="date"
                                type="date"
                                className="block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-2 top-2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m4 0v4m-4 0h4m4-4v4m0 0h4M4 9h16M4 13h16M4 17h16M7 21H5a2 2 0 01-2-2v-2h4m6 0h4v2a2 2 0 01-2 2h-2m4-14h2a2 2 0 012 2v4H3V9a2 2 0 012-2h2m-2 8h16m0 0v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2h16z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium" htmlFor="amount">Amount<span className="text-red-500">*</span></label>
                        <input
                            id="amount"
                            type="text"
                            placeholder="₹ 0000"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium" htmlFor="upload">Upload Bill<span className="text-red-500">*</span></label>
                    <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"></path>
                        </svg>
                        <p className="mt-2 text-sm text-blue-500 font-medium cursor-pointer">Upload a file</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="w-1/2 bg-gray-200 text-gray-700 rounded-md py-2 mr-2">Cancel</button>
                    <button className="w-1/2 bg-blue-500 text-white rounded-md py-2 ml-2">Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddExpensesDetails
