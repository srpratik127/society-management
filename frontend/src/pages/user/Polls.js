import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CreatePoll from "../../components/models/CreatePolls";

const Poll = () => {
  const [pollsData, setPollsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/polls`
        );
        setPollsData(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, selectedOptions) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/polls/vote`,
        {
          pollId,
          selectedOptions: [selectedOptions],
          residentId: user?._id,
        }
      );
      setPollsData((prevPollsData) =>
        prevPollsData.map((poll) =>
          poll._id === pollId ? { ...poll, ...response.data.poll } : poll
        )
      );
    } catch (error) {
      console.error("Error voting on poll:", error);
    }
  };

  if (loading) return <div>Loading polls...</div>;

  return (
    <>
      <div className="flex justify-between items-center border-gray-200 m-6 mb-0">
        <div className="flex space-x-6">
          <button className="p-2 px-4 border-b-4 border-orange-500 text-white bg-gradient-to-r from-[#FE512E] to-[#F09619] rounded-t-md font-semibold">
            Own Poll
          </button>
          <button className="pb-2 text-gray-600">New Poll</button>
          <button className="pb-2 text-gray-600">Previous Poll</button>
        </div>
      </div>

      <div className="p-4 m-6 mt-0 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold mb-4">Polls</h2>
          <button className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
            onClick={() => setIsCreatePollOpen(true)}
          >
            Create Polls
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pollsData.map((poll) => (
            <div
              key={poll._id}
              className="bg-white shadow rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-4">
                  <img
                    src={poll?.createdBy?._id?.profile_picture}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold flex-nowrap text-sm">
                      {poll?.createdBy?.model === "Resident"
                        ? poll?.createdBy?._id?.fullName
                        : `${poll?.createdBy?._id?.firstname} ${poll?.createdBy?._id?.lastname}`}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {poll?.multipleChoice && "Multichoice polls"}
                    </p>
                  </div>
                </div>
                <div className="ml-auto bg-[#6E8EF9] text-white  px-3 py-1 rounded-full flex gap-2">
                  <img src="/assets/whiteeye.svg" alt="" />
                  {poll?.totalVotes}
                </div>
              </div>
              <p className="font-medium">{poll.question}</p>
              <div className="flex relative gap-4">
                <img src="/assets/Radio.svg" alt="" />
                <div className="absolute left-3 top-0">
                  <img src="/assets/Radio.svg" alt="" />
                </div>
                <p className="text-orange-500 font-semibold text-sm">
                  Select one or more
                </p>
              </div>
              {poll.options.map((option, idx) => (
                <div key={idx} className="space-y-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleVote(poll._id, option._id)}
                    className={`flex gap-2 rounded-lg font-medium ${"border-gray-200 text-[#A7A7A7]"}`}
                  >
                    <img
                      src={
                        option.voters.some((voter) => voter._id === user?._id)
                          ? "/assets/fill-redio.svg"
                          : "/assets/unfill-redio.svg"
                      }
                      alt="Radio"
                    />
                  </button>
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="capitalize text-gray-600">
                          {option.optionText}
                        </span>
                      </div>
                      <span>{option.votes} votes</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      {poll.totalVotes > 0 ? (
                        <div
                          className={`h-2 rounded-full ${poll.options[0] === option
                              ? "bg-green-500"
                              : "bg-red-500"
                            }`}
                          style={{
                            width: `${(option.votes / poll.totalVotes) * 100}%`,
                          }}
                        ></div>
                      ) : (
                        <div className="h-2 rounded-full bg-gray-200"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-500 flex justify-end">
                {new Date(poll?.createdAt).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}{" "}
                {new Date(poll?.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
        {isCreatePollOpen && (
          <CreatePoll onClose={() => setIsCreatePollOpen(false)} />
        )}
      </div>
    </>
  );
};

export default Poll;
