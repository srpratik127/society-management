import React from 'react'
import announcementData from '../../data/userdetails/announcementdata'

const AnnouncementData = () => {
    return (
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 ">
                Announcement Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {announcementData.map((announcement) => (
                    <div
                        key={announcement.id}
                        className="text-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg mb-2 bg-[#5678E9] text-white p-2 rounded-t-lg">
                            {announcement.title}
                        </h3>
                       <div className='p-3'>
                       <div className="flex justify-between text-sm mb-2">
                            <p>Announcement Date:</p>
                            <p>{announcement.date}</p>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <p>Announcement Time:</p>
                            <p>{announcement.time}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Description:</p>
                            <p className="text-sm">{announcement.description}</p>
                        </div>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnnouncementData
