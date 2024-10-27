import React from 'react'
import { ImportantNumbers } from '../../data/admindashbord'

const ImportantNum = () => {
    return (
        <>
            <div className="flex justify-between items-center text-xl font-semibold bg-white p-2 rounded-lg">
                <h1>Important Numbers</h1>
                <button className="flex items-center space-x-2 p-2 px-3 rounded-md text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]">
                    <img src="/assets/add-square.svg" alt="Add Icon" className="h-5 w-5" />
                    <span>Add</span>
                </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {ImportantNumbers.map((importantNumber, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 border-b border-gray-200"
                    >
                        <div className="space-y-1">
                            <span className="block">
                                <span className="font-semibold">Name:</span>{" "}
                                <span className="font-light">{importantNumber.Name}</span>
                            </span>
                            <span className="block">
                                <span className="font-semibold">PhNumber:</span>{" "}
                                <span className="font-light">{importantNumber.PhNumber}</span>
                            </span>
                            <span className="block">
                                <span className="font-semibold">Work:</span>{" "}
                                <span className="font-light">{importantNumber.Work}</span>
                            </span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <img
                                src="/assets/delete.svg"
                                alt="Delete Icon"
                                className="h-10 w-10  cursor-pointer hover:bg-gray-100 rounded-full"
                            />
                            <img
                                src="/assets/edit.svg"
                                alt="Edit Icon"
                                className="h-10 w-10  cursor-pointer hover:bg-gray-100 rounded-full"
                            />
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default ImportantNum