import React from 'react'
import { upcomingactivities } from '../../data/admindashbord'

const UpcomingActivitys = () => {
    return (
        <div className='w-[25%] m-4 '>
            <div className="flex justify-between items-center rounded-lg bg-white p-2 ">
                <h1 className="text-xl font-semibold">Upcoming Activity</h1>
                <div className="relative">
                    <select className="bg-gray-100 border border-gray-300 rounded-md p-2">
                        <option>Week</option>
                        <option>Month</option>
                        <option>Year</option>
                    </select>
                </div>
            </div>
            <div className="max-h-48 overflow-y-auto bg-white rounded-b-lg">
                {upcomingactivities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-1 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div
                                className={`w-12 h-12 rounded-full`}
                                style={{ backgroundColor: activity.color }}
                            />
                            <div className="space-y-1">
                                <span className="block font-medium">{activity.eventName}</span>
                                <span className="block text-gray-500 text-sm">{activity.time}</span>
                            </div>
                        </div>
                        <div className="text-gray-500 font-semibold text-sm">
                            {activity.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpcomingActivitys