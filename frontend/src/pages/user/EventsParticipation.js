import React, { useState } from "react";
import { eventParticipationData } from "../../data/eventParticipationData ";


const EventsParticipation = () => {
    const [activeTab, setActiveTab] = useState("events");

    return (
        <div>
            <div className="flex border-b m-6 mb-0">
                <button
                    className={`px-4 py-2 font-semibold text-sm rounded-t-md ${activeTab === "events"
                            ? "text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                            : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("events")}
                >
                    Events Participate
                </button>
                <button
                    className={`px-4 py-2 font-semibold text-sm rounded-t-md ${activeTab === "activity"
                            ? "text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                            : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("activity")}
                >
                    Activity Participate
                </button>
            </div>

            {activeTab === "events" && (
                <div className="p-4 m-6 mt-0 bg-gray-50 rounded-lg shadow-lg">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Events Participation
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-100 text-gray-600">
                                    <th className="px-4 py-2">Participator Name</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2 text-center">Event Time</th>
                                    <th className="px-4 py-2">Event Date</th>
                                    <th className="px-4 py-2">Event Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventParticipationData.map((participant, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            }`}
                                    >
                                        <td className="px-4 py-2 flex items-center space-x-3">
                                            <img
                                                src="/assets/Avatar.png"
                                                alt={participant.name}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                                            />
                                            <span className="font-medium">{participant.name}</span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {participant.description}
                                        </td>
                                        <td className="px-4 py-2 text-center text-gray-600">
                                            {participant.time}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {participant.date}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {participant.eventName}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "activity" && (
                <div className="p-4 m-6 mt-0 bg-gray-50 rounded-lg shadow-lg">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Activity Participation
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-100 text-gray-600">
                                    <th className="px-4 py-2">Participator Name</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2 text-center">Activity Time</th>
                                    <th className="px-4 py-2">Activity Date</th>
                                    <th className="px-4 py-2">Activity Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventParticipationData.map((participant, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            }`}
                                    >
                                        <td className="px-4 py-2 flex items-center space-x-3">
                                            <img
                                                src="/assets/Avatar.png"
                                                alt={participant.name}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                                            />
                                            <span className="font-medium">{participant.name}</span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {participant.description}
                                        </td>
                                        <td className="px-4 py-2 text-center text-gray-600">
                                            {participant.time}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {participant.date}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {participant.eventName}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsParticipation;