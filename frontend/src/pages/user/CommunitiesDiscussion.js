import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { socket } from "../../utils/socket";
import { Popover } from "@headlessui/react";
import Loader from "../../components/Loader";

const CommunitiesDiscussion = () => {
  const userId = useSelector((store) => store.auth.user._id);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [historyMessage, setHistoryMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/chat/groups`
        );
        setGroups(data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchGroupMessage = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/chat/${selectedGroup._id}/questions`
        );
        setHistoryMessage(data?.questions);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    if (selectedGroup) {
      fetchGroupMessage();
    }
  }, [selectedGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyMessage]);

  const handelGroupSelect = async (chat) => {
    setSelectedGroup(chat);
    setShowQuestion(true);
    socket.emit("joinGroup", { userId, groupId: chat._id });
  };

  const handelAskQuestion = async (event) => {
    event.preventDefault();
    const tempQuestion = {
      _id: Date.now().toString(),
      questionText: message,
      askedBy: userId,
      createdAt: new Date().toISOString(),
      answers: [],
    };
    setMessage("");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/chat/ask-question`,
        {
          groupId: selectedGroup._id,
          questionText: message,
          askedBy: userId,
        }
      );

      console.log(data);
      setHistoryMessage((prev) => [...prev, data]);
      toast.success("Question posted successfully");
      setShowQuestion(true);
    } catch (error) {
      setHistoryMessage((prev) =>
        prev.filter((q) => q._id !== tempQuestion._id)
      );
      toast.error(error.response?.data?.message || "Failed to post question");
    }
  };

  const handelPostAnswer = async (event) => {
    event.preventDefault();
    const answerText = document.querySelector("textarea").value;

    if (!answerText) {
      toast.error("Answer cannot be empty");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/chat/answer-question`,
        {
          groupId: selectedGroup._id,
          questionId: selectedQuestion._id,
          answeredBy: userId,
          answerText,
        }
      );
      setSelectedQuestion((prev) => ({
        ...prev,
        answers: [...prev.answers, data.newAnswer],
      }));
      setHistoryMessage((prev) =>
        prev.map((q) =>
          q._id === selectedQuestion._id
            ? { ...q, answers: [...q.answers, data.newAnswer] }
            : q
        )
      );
      document.querySelector("textarea").value = "";
      toast.success("Answer posted successfully!");
      setShowQuestion(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post answer");
    }
  };

  const handelSelectedMessage = (question) => {
    setSelectedQuestion(question);
    setShowAnswer(true);
    setShowQuestion(false);
    console.log(question);
  };

  return (
    <div className="flex m-6">
      {/* Chat Sidebar */}
      <div className="bg-white p-4 rounded-l-lg w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Chat</h2>
        </div>
        <div className={`items-center relative w-full flex mb-3`}>
          <span className="absolute left-3 text-gray-400">
            <img src="/assets/search-Bordere.svg" alt="" />
          </span>
          <input
            type="text"
            placeholder="Search Here"
            className="pl-10 pr-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <ul className="space-y-4">
          {(groups || []).map((chat, idx) => (
            <li
              key={idx}
              onClick={() => handelGroupSelect(chat)}
              className={`flex items-center justify-between p-2 ${
                selectedGroup?._id === chat._id && "bg-[#5678E90D]"
              } hover:bg-[#5678E90D] rounded-lg cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                  <img src="/assets/empty.png" alt="" />
                </div>
                <div>
                  <span>{chat.groupName}</span>
                  <p className="text-xs">9:00 PM</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Community Discussions */}
      <div className="flex-1 min-h-[85vh] rounded-r-lg bg-[#F4F4F4] overflow-y-auto border">
        {selectedGroup ? (
          <>
            <div className="flex flex-wrap justify-between items-center p-4 py-2 bg-white w-full sticky top-0 shadow">
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedGroup.groupName}
                </h2>
                <p className="text-[#A7A7A7] text-sm">9:00 PM</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    setShowQuestion(false);
                    setShowAnswer(false);
                  }}
                >
                  Ask Question
                </button>
                <Popover className="relative">
                  <Popover.Button className="text-white outline-none">
                    <img
                      src="/assets/info.svg"
                      className="md:w-8 md:h-8 w-6 h-6 rounded-full cursor-pointer hover:shadow-md"
                    />
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Copy
                      </button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Forward
                      </button>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
            </div>

            <div className="p-4 h-[72vh] overflow-y-auto">
              {showQuestion ? (
                <>
                  {(historyMessage || []).map((question) => (
                    <div
                      key={question._id}
                      onClick={() => handelSelectedMessage(question)}
                      className={`flex flex-col items-start md:flex-row gap-2 mb-4 p-4 rounded-lg bg-[#eceef3] cursor-pointer`}
                    >
                      <div className="w-full">
                        <div className="flex w-full gap-4">
                          <div className="text-sm text-[#A7A7A7]">
                            <p className="mb-2">0 votes</p>
                            <p className="text-[#5678E9] text-nowrap">
                              {question?.answers?.length} answers
                            </p>
                          </div>
                          <div>
                            <p className="text-[#4F4F4F]">
                              {question?.questionText}
                            </p>
                            {question?.answers.map((answer, index) => (
                              <p
                                key={answer?._id}
                                className="text-[#A7A7A7] mt-2"
                              >
                                {index + 1}. {answer.answerText}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto bg-white text-[#4F4F4F] px-3 py-1 rounded-full flex gap-2">
                        <img
                          src="/assets/whiteeye.svg"
                          className="brightness-50"
                          alt=""
                        />{" "}
                        20
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : !showAnswer ? (
                <>
                  <div className="mx-auto p-6 bg-[#5678E91A] rounded-lg border border-[#5678E9]">
                    <h2 className="text-lg font-normal text-gray-800">
                      Writing a good question
                    </h2>
                    <p className="mt-2 text-gray-800 text-sm">
                      You're ready to
                      <span className="text-blue-500 hover:underline">
                        ask a programming-related question
                      </span>
                      and this form will help guide you through the process.
                      Looking to ask a non-programming question?
                      <span className="text-blue-500 hover:underline">
                        See the topics here
                      </span>
                      to find a relevant site.
                    </p>
                    <h3 className="mt-3 font-medium text-gray-700">Steps</h3>
                    <ul className="mt-1 space-y-2 text-gray-800 text-sm">
                      <li>• Summarize your problem in a one-line title.</li>
                      <li>• Describe your problem in more detail.</li>
                      <li>
                        • Describe what you tried and what you expected to
                        happen.
                      </li>
                      <li>
                        • Add "tags" which help surface your question to members
                        of the community.
                      </li>
                      <li>• Review your question and post it to the site.</li>
                    </ul>
                  </div>
                  <div className="border p-3 mt-4 rounded-lg border-[#D3D3D3]">
                    <p className="text-gray-700">Title</p>
                    <p className="text-gray-700 mt-2 mb-2">
                      Be specific and imagine you're asking a question to
                      another person.
                    </p>
                    <form className="">
                      <input
                        type="text"
                        className={`px-2 py-2 w-full border rounded-md outline-none bg-transparent focus:ring-2 focus:ring-[#5678E9]`}
                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        className="cursor-pointer bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg mt-3"
                        disabled={message === ""}
                        onClick={handelAskQuestion}
                      >
                        Next
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="d-flex">
                  <div></div>
                  <div>
                    <div
                      className={`flex flex-col md:flex-row gap-2 mb-4 p-4 rounded-lg bg-[#eceef3] cursor-pointer`}
                    >
                      <div className="w-full">
                        <p className="border-b-2 border-[#F6F8FB] text-[#4F4F4F] mb-2 pb-2">
                          {selectedQuestion.questionText}
                        </p>
                        <p className="text-[#5678E9]">Answers</p>
                        {selectedQuestion?.answers.map((answer, index) => (
                          <p
                            key={answer?._id}
                            className="flex text-[#4F4F4F] mt-3"
                          >
                            <span>{index + 1}.</span>
                            {answer.answerText}
                          </p>
                        ))}
                      </div>
                    </div>
                    <form>
                      <p>Your Answer</p>
                      <textarea
                        className="w-full outline-none p-2 border border-[#D3D3D3] rounded-lg"
                        name=""
                        id=""
                        rows="6"
                        placeholder="Type Here"
                      ></textarea>
                      <button
                        className="cursor-pointer bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg block ml-auto mt-3"
                        onClick={handelPostAnswer}
                      >
                        Post Your Answer
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[86vh] text-lg text-gray-400 select-none">
            Select Community to Start Conversation..!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitiesDiscussion;
