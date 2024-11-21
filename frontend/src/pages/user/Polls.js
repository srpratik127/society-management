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
    <>
      <div className="flex justify-between items-center border-b-2 border-gray-200 m-6">
        <div className="flex space-x-6">
          <button className="pb-2 border-b-4 border-orange-500 text-orange-500 font-semibold">
            Own Poll
          </button>
          <button className="pb-2 text-gray-600">New Poll</button>
          <button className="pb-2 text-gray-600">Previous Poll</button>
        </div>

      </div>
    
    <div className="p-4 m-6 mt-0 bg-white rounded-lg">


      <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-semibold mb-4">Polls</h2>
      <button className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-md shadow hover:bg-orange-600">
        Create Polls
      </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pollsData.map((poll, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 space-y-4">

            <div className="flex items-center space-x-4 border-b pb-3">
              <img
                src="/assets/Avatar.png"
                alt=''
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold flex-nowrap text-sm">{poll.user}</h3>
                <p className="text-sm text-gray-500 text-xs">{poll.type}</p>
              </div>
              <div className="ml-auto bg-[#6E8EF9] text-white  px-3 py-1 rounded-full flex gap-2">
                <img src="/assets/whiteeye.svg" alt="" />
                {poll.totalVotes}
              </div>
            </div>

            <p className="font-medium">{poll.question}</p>
            <div className="flex relative gap-4">
              <img src="/assets/Radio.svg" alt="" />
              <div className="absolute left-3 top-0">
                <img src="/assets/Radio.svg" alt="" />
              </div>
              <p className="text-orange-500 font-semibold text-sm">Select one or more</p>
            </div>


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

            <p className="text-sm text-gray-500 flex justify-end">{poll.creationDate}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Poll;
