import React from 'react'
import vehicleData from '../../data/userdetails/vehicledata'

const VehicleData = () => {
  return (
    <div className="p-4 m-6 mt-0 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
                Vehicle : ({vehicleData.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {vehicleData.map((vehicale, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md"
                    >
            
                        <div className="bg-[#5678E9] text-white rounded-t-lg p-2 font-semibold">
                            {vehicale.vehicletype}
                        </div>
                  
                        <div className="p-3 text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium">Vehicle Name</p>
                                <p>{vehicale.vehiclename}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Vehicle Number</p>
                                <p>{vehicale.vehiclenumber}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default VehicleData
