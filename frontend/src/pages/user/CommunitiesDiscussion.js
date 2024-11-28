import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { socket } from "../../utils/socket";

const CommunitiesDiscussion = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const userId = useSelector((store) => store.auth.user._id);

  const [showHistoryMessage, setShowHistoryMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);

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

  const handelGroupSelect = async (chat) => {
    setSelectedGroup(chat);
    socket.emit("joinGroup", { userId, groupId: chat._id });
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/api/chat/messages/${chat._id}`
      );
      setShowHistoryMessage(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (selectedGroup) {
      const handleIncomingMessage = (messageData) => {
        setShowHistoryMessage((prevMessages) => [...prevMessages, messageData]);
      };

      socket.on("receiveGroupMessage", handleIncomingMessage);

      return () => {
        socket.off("receiveGroupMessage", handleIncomingMessage);
      };
    }
  }, [selectedGroup]);

  const handleSendMessageOrMedia = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("groupId", selectedGroup?._id);

      if (message.trim()) {
        formData.append("message", message);
      }
      if (media) {
        formData.append("file", media);
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/chat/sendgroupmessage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setShowHistoryMessage((prevMessages) => [...prevMessages, data.message]);

      socket.emit("sendGroupMessage", {
        senderId: userId,
        groupId: selectedGroup?._id,
        message: data.message.message,
        mediaUrl: data.message.mediaUrl,
      });

      setMessage("");
      setMedia(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex m-6">
      {/* Chat Sidebar */}
      <div className="bg-white p-4 rounded-l-lg w-[300px]">
        <h2 className="text-lg font-semibold mb-4">Chat</h2>
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
          {groups.map((chat, idx) => (
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
                  <p className="text-xs">
                    Members : 0{chat.groupMembers?.length}
                  </p>
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
                <button>
                  <img src="/assets/info.svg" alt="" />
                </button>
              </div>
            </div>
            <div className="p-4 h-[72vh] overflow-y-auto">
              {showHistoryMessage.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col md:flex-row gap-2 mb-4 p-4 rounded-lg ${
                    message.senderId._id === userId
                      ? "bg-[#6f768e3d]"
                      : "bg-[#5678E90D]"
                  }`}
                >
                  {/* <div className="flex-shrink-0 text-sm gap-4 flex flex-col">
                <span>{item.votes} votes</span>
                <span className="text-blue-500 text-xs">
                  {item.answers} answers
                </span>
              </div> */}
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <h3 className="font-semibold mb-2 capitalize">
                        {message?.senderId?.fullName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <button className="flex items-center gap-1 bg-white px-2 rounded-full uppercase">
                          {/* <span>
                        <img src="/assets/eye.svg" className="w-5 h-5" alt="" />
                      </span> */}
                          {new Date(message?.createdAt).toLocaleString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white">
              <form
                onSubmit={handleSendMessageOrMedia}
                className="px-4 py-3 border-t border-gray-200 flex items-center space-x-4"
              >
                <div className={`items-center relative w-full flex`}>
                  {media && (
                    <div className="w-14 mb-3 h-14 rounded-lg top-[-68px] ms-4 absolute overflow-hidden border">
                      <img
                        src={URL.createObjectURL(media)}
                        alt="IMG"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* type text */}
                  <input
                    type="text"
                    className={`pr-10 pl-4 py-2 w-full shadow border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {/* type media */}
                  <span className="absolute right-3 text-gray-400 cursor-pointer">
                    <label htmlFor="inputFile" className="cursor-pointer">
                      <img src="/assets/Paperclip.svg" alt="" />
                    </label>
                    <input
                      id="inputFile"
                      type="file"
                      accept=".png,.jpeg,.jpg,"
                      onChange={(e) => setMedia(e.target.files[0])}
                      className="hidden"
                    />
                  </span>
                </div>
              </form>
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
