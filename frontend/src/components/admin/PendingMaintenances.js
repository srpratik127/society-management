import React from 'react'
import { PendingMaintenance } from '../../data/admindashbord'

const PendingMaintenances = () => {
    return (
        <>
            <div className="flex justify-between items-center text-xl font-semibold bg-white pb-1">
                <h2 className='m-0'>Pending Maintenances</h2>
                <button className="flex items-center space-x-2 px-3 rounded-md text-[#5678E9] text-lg">
                    <span>View all</span>
                </button>
            </div>
            <div className="max-h-[350px] overflow-y-auto bg-white rounded-lg mt-2">
                {PendingMaintenance.map((PendingMainten, index) => (
                    <div key={index} className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/assets/Ellipse 1091.png"
                                alt={PendingMainten.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="space-y-1">
                                <span className="block font-medium">{PendingMainten.name}</span>
                                <span className="block text-gray-500 text-sm">{PendingMainten.panding}</span>
                            </div>
                        </div>
                        <div className="text-red-500 font-semibold text-lg">
                            ₹ {PendingMainten.pandingamount}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PendingMaintenances