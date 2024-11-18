import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";

const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ["websocket"],
  withCredentials: true,
});

const ChatComponent = () => {
  const userId = useSelector((store) => store.auth.user._id);
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [allResident, setAllResident] = useState([]);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/resident`
        );
        setAllResident(response?.data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchResidents();
  }, []);

  useEffect(() => {
    setReceiverId("673624cf53e66858dca625af");

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join", { userId, receiverId });
    });

    socket.on("private message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    socket.on("media message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("connect");
      socket.off("private message");
      socket.off("media message");
    };
  }, [userId, receiverId]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/chat/history/${userId}/${receiverId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history", error);
      }
    };

    fetchChatHistory();
  }, [userId, receiverId]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("private message", { message, receiverId });
    setMessage("");
  };

  const handleSendMediaMessage = async (event) => {
    event.preventDefault();
    if (!media) return;

    const formData = new FormData();
    formData.append("file", media);
    formData.append("senderId", userId);
    formData.append("receiverId", receiverId);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chat/sendMedia`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      socket.emit("media message", response.data);
      setMedia(null);
    } catch (error) {
      console.error("Error sending media message", error);
    }
  };

  return (
    <div className="flex bg-white m-6 rounded-lg">
      <div className="w-[300px] p-4 ">
        <h2 className="text-xl font-semibold mb-3">Chat</h2>
        <div
          className={`items-center relative w-1/4 xl:ms-0 hidden md:flex ms-10 mb-3`}
        >
          <span className="absolute left-3 text-gray-400">
            <img src="/assets/search-Bordere.svg" alt="" />
          </span>
          <input
            type="text"
            placeholder="Search Here"
            className="pl-10 pr-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {allResident.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 my-2 hover:bg-slate-100 overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              src={item.profile_picture}
              className="w-10 h-10 rounded-full border"
              alt=""
            />
            <div>
              <h2 className="text-lg leading-[16px]">{item.fullName}</h2>
              <h2 className="text-sm text-[#A7A7A7]">{item.email}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#F4F4F40] min-h-[86vh] overflow-auto relative">
        <div className="bg-white flex justify-between p-4 sticky top-0">
          <h2 className="text-xl font-semibold">Chat with {receiverId}</h2>
          <h2 className="text-xl font-semibold">Chat with {receiverId}</h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto min-h-[64vh] bg-[#F4F4F4] space-y-4 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] ${
                msg.senderId === userId
                  ? "text-right self-end"
                  : "text-left self-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg  ${
                  msg.senderId === userId
                    ? "bg-[#5678E9] text-white text-right self-end"
                    : "bg-[#5678e917] text-left self-start"
                }`}
              >
                {msg.message ? (
                  <p>{msg.message}</p>
                ) : (
                  <img
                    src={msg.mediaUrl}
                    alt="media"
                    className="w-[470px] h-[278px] object-cover rounded-lg"
                  />
                )}
              </div>
              <p className="text-sm text-[#A7A7A7]">
                {new Date(msg.createdAt).toTimeString().slice(0, 5)}
              </p>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white">
          <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg border border-gray-300"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-[#FE512E] text-white rounded-lg disabled:opacity-50"
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>

          <div className="p-4 border-t border-gray-200">
            <form
              onSubmit={handleSendMediaMessage}
              className="flex items-center space-x-2"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMedia(e.target.files[0])}
                className="file-input"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F09619] text-white rounded-lg disabled:opacity-50"
                disabled={!media}
              >
                Send Media
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
