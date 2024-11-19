import React from 'react'
import { useSelector } from 'react-redux';

const VehicleData = () => {
    const user = useSelector((store) => store.auth.user);
  return (
    <div className="p-4 m-6 mt-0 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
                Vehicle : (0{user?.vehicles?.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {user.vehicles.map((vehicle, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg border border-[#5678E94D]"
                    >
            
                        <div className="bg-[#5678E9] text-white rounded-t-lg p-2 font-semibold">
                            {vehicle.vehicleType}
                        </div>
                  
                        <div className="p-3 text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium">Vehicle Name</p>
                                <p>{vehicle.vehicleName}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Vehicle Number</p>
                                <p>{vehicle.vehicleNumber}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default VehicleData
