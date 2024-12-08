import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CreatePoll from "../../components/models/CreatePolls";
import toast from "react-hot-toast";

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
        toast.error(error.response?.data?.message);
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
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) return <div>Loading polls...</div>;

  return (
    <>
      <div className="flex justify-between items-center border-gray-200 m-6 mb-0">
        <div className="flex">
          <button className="p-2 px-4 border-b-2 border-orange-500 text-white bg-gradient-to-r from-[#FE512E] to-[#F09619] rounded-t-md font-semibold">
            Own Poll
          </button>
          <button className="p-2 px-4 border-b-2 border-orange-500 bg-white rounded-t-md">
            New Poll
          </button>
          <button className="p-2 px-4 border-b-2 border-orange-500 bg-white rounded-t-md">
            Previous Poll
          </button>
        </div>
      </div>  

      <div className="p-4 m-6 mt-0 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Polls</h2>
          <button
            className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white  px-4 py-2 rounded-md shadow hover:bg-orange-600"
            onClick={() => setIsCreatePollOpen(true)}
          >
            Create Polls
          </button>
        </div>
        {pollsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pollsData.map((poll) => (
              <div
                key={poll._id}
                className="bg-white shadow rounded-lg p-4 space-y-4 border"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={poll?.createdBy?._id?.profile_picture}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold flex-nowrap text-sm capitalize">
                        {poll?.createdBy?.model === "Resident"
                          ? poll?.createdBy?._id?.fullName
                          : `${poll?.createdBy?._id?.firstname} ${poll?.createdBy?._id?.lastname}`}
                      </h3>
                      <p className="text-sm text-gray-500">{poll?.choice}</p>
                    </div>
                  </div>
                  <div className="ml-auto bg-[#6E8EF9] text-white  px-3 py-1 rounded-full flex gap-2">
                    <img src="/assets/whiteeye.svg" alt="" />
                    {poll?.totalVotes}
                  </div>
                </div>
                <p className="font-medium">{poll.question}</p>
                <div className="flex gap-4">
                  <div className="flex">
                    <img src="/assets/Radio.svg" alt="" />
                    <img src="/assets/Radio.svg" className="ml-[-7px]" alt="" />
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
                              width: `${(option.votes / poll.totalVotes) * 100
                                }%`,
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
        ) : (
          <p className="text-center py-4 text-gray-400 select-none">
            No Polls Data Found!
          </p>
        )}
      </div>
      {isCreatePollOpen && (
        <CreatePoll
          onClose={() => setIsCreatePollOpen(false)}
          setPollsData={setPollsData}
        />
      )}
    </>
  );
};

export default Poll;
