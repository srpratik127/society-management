import React from "react";

const CommunitiesDiscussion = () => {
    const chatList = [
        { name: "Michael John", time: "10:27" },
        { name: "Jenny Wilson", time: "7:00" },
        { name: "Community", time: "9:20" },
        { name: "Esther Howard", time: "10:27" },
        { name: "Cody Fisher", time: "7:00" },
    ];

    const discussions = [
        {
            id: 1,
            votes: 0,
            answers: 1,
            question: "What is the capital of France?",
            description:
                "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            id: 2,
            votes: 0,
            answers: 0,
            question: "What is the capital of France?",
            description:
                "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            id: 3,
            votes: 3,
            answers: 0,
            question: "What is the capital of France?",
            description:
                "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            id: 4,
            votes: 0,
            answers: 2,
            question: "What is the capital of France?",
            description:
                "1. Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!\n2. Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            id: 5,
            votes: 0,
            answers: 1,
            question: "What is the capital of France?",
            description:
                "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            id: 6,
            votes: 0,
            answers: 0,
            question: "What is the capital of France?",
            description:
                "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            id: 7,
            votes: 3,
            answers: 0,
            question: "What is the capital of France?",
            description:
                "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
    ];

    return (
        <div className="flex m-6 h-full flex-col md:flex-row fixed">
            {/* Chat Sidebar */}
            <div className="bg-white p-4 shadow-md  rounded-l-lg w-full sm:w-1/3 lg:w-1/4">
                <h2 className="text-lg font-semibold mb-4">Chat</h2>
                <input
                    type="text"
                    placeholder="Search Here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />
                <ul className="space-y-4">
                    {chatList.map((chat, idx) => (
                        <li
                            key={idx}
                            className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full">
                                    <img src="/assets/Avatar.png" alt="" />
                                </div>
                               <div>
                               <span>{chat.name}</span>
                               <p className="text-xs">Hii, John! how are you doing?</p>
                               </div>
                            </div>
                         <div className="gap-4">
                         <span className="text-sm text-gray-500">{chat.time}</span>
                         <img src="/assets/doubleTick.svg" alt="" />
                         </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Community Discussions */}
            <div className="flex-1 rounded-r-lg h-full bg-[#F4F4F4] overflow-y-auto ">
                <div className="flex flex-wrap justify-between items-center p-4 bg-white ">
                    <div>
                        <h2 className="text-lg font-semibold">Community</h2>
                        <p className="text-[#A7A7A7]">9:00 PM</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                            Ask Question
                        </button>
                        <button>
                            <img src="/assets/info.svg" alt="" />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    {discussions.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row gap-2 mb-4 bg-[#fbfcff] p-4 rounded-lg"
                           
                        >
                            <div className="flex-shrink-0 text-sm gap-4 flex flex-col">
                                <span>{item.votes} votes</span>
                                <span className="text-blue-500 text-xs">{item.answers} answers</span>
                            </div>
                            <div>
                                <div className="flex justify-between w-full">
                                    <h3 className="font-semibold mb-2">{item.question}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <button className="flex items-center gap-1 bg-white px-2 rounded-full">
                                            <span>
                                                <img src="/assets/eye.svg" className="w-5 h-5" alt="" />
                                            </span>
                                            20
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunitiesDiscussion;
