import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { socket } from "../../utils/socket";

const ChatComponent = () => {
  const userId = useSelector((store) => store.auth.user._id);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allResident, setAllResident] = useState([]);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/resident`
        );
        setAllResident(response?.data?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchResidents();
  }, []);

  const joinChat = (item) => {
    setReceiver(item);
    socket.emit("join", { userId, receiverId: item._id });
  };

  useEffect(() => {
    if (receiver) {
      socket.on("message", (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });
    }

    return () => {
      socket.off("message");
    };
  }, [receiver]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/chat/history/${userId}/${receiver._id}`
        );
        setMessages(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (receiver) {
      fetchChatHistory();
    }
  }, [userId, receiver]);

  const handleSendMessageOrMedia = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("receiverId", receiver._id);

      if (message.trim()) {
        formData.append("message", message);
      }
      if (media) {
        formData.append("file", media);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/chat/message`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      socket.emit("message", response.data);

      setMessage("");
      setMedia(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        // setRecordingSeconds(0);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        toast.error(
          "Microphone access was denied. Please allow access to record audio."
        );
      } else {
        toast.error("An error occurred while accessing the microphone.");
      }
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      clearInterval(timerRef.current);
    }
  };

  const sendVoiceMessage = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("senderId", userId);
    formData.append("receiverId", receiver._id);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/api/chat/message`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      socket.emit("message", response.data);
      setAudioBlob(null);

      setRecordingSeconds(0);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white m-4 rounded-lg h-[90vh]">
    {/* Sidebar */}
    <div className="w-full lg:w-[300px] p-4 border-b lg:border-b-0 lg:border-r">
      <h2 className="text-xl font-semibold mb-3">Chat</h2>
      <div className="relative w-full flex mb-3">
        <span className="absolute left-3 text-gray-400">
          <img src="/assets/search-Bordere.svg" alt="Search Icon" />
        </span>
        <input
          type="text"
          placeholder="Search Here"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
        />
      </div>
      {allResident.map((item, index) => (
        <div
          key={index}
          onClick={() => joinChat(item)}
          className={`flex items-center gap-2 p-2 my-2 ${
            receiver?._id === item._id && "bg-slate-200"
          } hover:bg-slate-200 rounded-lg cursor-pointer`}
        >
          <img
            src={item.profile_picture}
            className="w-10 h-10 rounded-full border"
            alt=""
          />
          <div>
            <h2 className="text-lg leading-[16px] capitalize">{item.fullName}</h2>
            <h2 className="text-sm text-[#A7A7A7]">{item.email}</h2>
          </div>
        </div>
      ))}
    </div>
  
    {/* Chat Area */}
    <div className="flex-1 bg-[#F4F4F4] h-full min-h-[80vh] overflow-auto relative">
      {receiver ? (
        <>
          {/* Chat Header */}
          <div className="bg-white flex justify-between p-4 sticky top-0 shadow">
            <div className="flex gap-3 items-center">
              <img
                src={receiver.profile_picture}
                className="w-12 h-12 rounded-full border-2"
              />
              <div>
                <h4 className="font-semibold text-lg capitalize">{receiver.fullName}</h4>
                <p className="text-[#A7A7A7]">{receiver.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <img
                src="/assets/video.svg"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <img
                src="/assets/call.svg"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <img
                src="/assets/info.svg"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>
  
          {/* Messages */}
          <div className="p-4 h-[72vh] overflow-y-auto space-y-4 flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[60%] ${
                  msg.senderId === userId
                    ? "self-end text-right"
                    : "self-start text-left"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.senderId === userId
                      ? "bg-[#5678E9] text-white"
                      : "bg-[#5678e917]"
                  }`}
                >
                  {msg.mediaUrl && msg.mediaUrl.endsWith(".webm") && (
                    <audio controls className="w-80">
                      <source src={msg.mediaUrl} type="audio/wav" />
                    </audio>
                  )}
                  {msg.mediaUrl && !msg.mediaUrl.endsWith(".webm") && (
                    <img
                      src={msg.mediaUrl}
                      alt="media"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </div>
                <p className="text-[12px] text-[#A7A7A7]">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Right now"}
                </p>
              </div>
            ))}
          </div>
  
          {/* Input Area */}
          <div className="sticky bottom-0 bg-white p-4 border-t">
            <form
              onSubmit={handleSendMessageOrMedia}
              className="flex items-center space-x-4"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="pr-10 pl-4 py-2 w-full border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <span className="absolute right-3 text-gray-400 cursor-pointer">
                  <label htmlFor="inputFile" className="cursor-pointer">
                    <img src="/assets/Paperclip.svg" alt="Attachment" />
                  </label>
                  <input
                    id="inputFile"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setMedia(e.target.files[0])}
                    className="hidden"
                  />
                </span>
              </div>
              <div
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-2 cursor-pointer ${
                  isRecording ? "bg-red-500" : "bg-[#5678E9]"
                } text-white rounded-full`}
              >
                <img src="/assets/microphone-white.svg" alt="Microphone" />
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-400">
          Select Chat to Start Chatting..!
        </div>
      )}
    </div>
  </div>
  
  );
};

export default ChatComponent;
