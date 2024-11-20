import React from "react";

const Poll = () => {
  const pollsData = [
    {
      user: "Arlene McCoy",
      type: "Multichoice polls",
      profileImage: "/path/to/profile.jpg",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      votes: [
        { option: "Yes", percentage: 75, color: "bg-green-500" },
        { option: "No", percentage: 40, color: "bg-red-500" },
      ],
      creationDate: "01/07/2024, 10:00 AM",
      totalVotes: 20,
    },
    {
        user: "Arlene McCoy",
        type: "Multichoice polls",
        profileImage: "/path/to/profile.jpg",
        question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
        votes: [
          { option: "Yes", percentage: 75, color: "bg-green-500" },
          { option: "No", percentage: 40, color: "bg-red-500" },
        ],
        creationDate: "01/07/2024, 10:00 AM",
        totalVotes: 20,
      },
      {
        user: "Arlene McCoy",
        type: "Multichoice polls",
        profileImage: "/path/to/profile.jpg",
        question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
        votes: [
          { option: "Yes", percentage: 75, color: "bg-green-500" },
          { option: "No", percentage: 40, color: "bg-red-500" },
        ],
        creationDate: "01/07/2024, 10:00 AM",
        totalVotes: 20,
      },
      {
        user: "Arlene McCoy",
        type: "Multichoice polls",
        profileImage: "/path/to/profile.jpg",
        question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
        votes: [
          { option: "Yes", percentage: 75, color: "bg-green-500" },
          { option: "No", percentage: 40, color: "bg-red-500" },
        ],
        creationDate: "01/07/2024, 10:00 AM",
        totalVotes: 20,
      },
  
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  
      <div className="flex justify-between items-center border-b-2 border-gray-200 mb-6">
        <div className="flex space-x-6">
          <button className="pb-2 border-b-4 border-orange-500 text-orange-500 font-semibold">
            Own Poll
          </button>
          <button className="pb-2 text-gray-600">New Poll</button>
          <button className="pb-2 text-gray-600">Previous Poll</button>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600">
          Create Polls
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Polls</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pollsData.map((poll, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 space-y-4">
  
            <div className="flex items-center space-x-4">
              <img
                src="/assets/Avatar.png"
                alt=''
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{poll.user}</h3>
                <p className="text-sm text-gray-500">{poll.type}</p>
              </div>
              <div className="ml-auto bg-gray-200 text-blue-500 font-bold px-3 py-1 rounded-full">
                {poll.totalVotes}
              </div>
            </div>

            <p className="font-medium">{poll.question}</p>
            <p className="text-orange-500 font-semibold text-sm">Select one or more</p>

    
            {poll.votes.map((vote, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>{vote.option}</span>
                  <span>{vote.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className={`h-2 rounded-full ${vote.color}`}
                    style={{ width: `${vote.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}

            <p className="text-sm text-gray-500">{poll.creationDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;
