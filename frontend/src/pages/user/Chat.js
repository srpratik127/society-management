import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ["websocket"],
  withCredentials: true,
});

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

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/resident`
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
          `${process.env.REACT_APP_BASE_URL}/api/chat/history/${userId}/${receiver._id}`
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
        `${process.env.REACT_APP_BASE_URL}/api/chat/message`,
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
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return alert("Your browser doesn't support audio recording.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(blob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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
        `${process.env.REACT_APP_BASE_URL}/api/chat/message`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      socket.emit("message", response.data);
      setAudioBlob(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCameraCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMedia(file); // Set the media state with the captured file
      toast.success("Photo captured successfully!");
    }
  };

  return (
    <div className="flex bg-white m-4 rounded-lg">
      <div className="w-[300px] p-4 ">
        <h2 className="text-xl font-semibold mb-3">Chat</h2>
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
        {allResident.map((item, index) => (
          <div
            key={index}
            onClick={() => joinChat(item)}
            className={`flex items-center gap-2 p-2 my-2 ${
              receiver?._id === item._id && "bg-slate-200"
            } hover:bg-slate-200 overflow-hidden rounded-lg cursor-pointer`}
          >
            <img
              src={item.profile_picture}
              className="w-10 h-10 rounded-full border"
              alt=""
            />
            <div>
              <h2 className="text-lg leading-[16px] capitalize">
                {item.fullName}
              </h2>
              <h2 className="text-sm text-[#A7A7A7]">{item.email}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#F4F4F4] min-h-[86vh] overflow-auto relative">
        {receiver ? (
          <>
            <div className="bg-white flex justify-between p-4 py-3 sticky top-0 shadow">
              <div className="flex gap-3 items-center">
                <img
                  src={receiver.profile_picture}
                  className="w-10 h-10 rounded-full border-2"
                />
                <div>
                  <h4 className="font-semibold text-lg capitalize leading-none">
                    {receiver.fullName}
                  </h4>
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

            <div className="flex-1 p-4 overflow-auto h-[72vh] bg-[#F4F4F4] space-y-4 flex flex-col">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[60%] ${
                    msg.senderId === userId
                      ? "text-right self-end"
                      : "text-left self-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg  ${
                      msg.senderId === userId
                        ? "bg-[#5678E9] text-white text-left"
                        : "bg-[#5678e917] text-left self-start"
                    }`}
                  >
                    {msg.mediaUrl && msg.mediaUrl.endsWith(".webm") && (
                      <audio controls className="w-80">
                        <source src={msg.mediaUrl} type="audio/wav" />
                        Your browser does not support the audio tag.
                      </audio>
                    )}

                    {msg.mediaUrl && !msg.mediaUrl.endsWith(".webm") && (
                      <img
                        src={msg.mediaUrl}
                        alt="media"
                        className="w-[470px] h-[278px] object-cover rounded-lg"
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

            <div className="sticky bottom-0 bg-white">
              <form
                onSubmit={handleSendMessageOrMedia}
                className="px-4 py-3 border-t border-gray-200 flex items-center space-x-4"
              >
                <div className={`items-center relative w-full flex`}>
                  {media && (
                    <div className="w-11 mb-3 h-11 top-[-1px] rounded-full absolute overflow-hidden border border-transparent">
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
                    className={`pr-10 pl-4 py-2 w-full ${
                      media && "pl-12"
                    } shadow border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500`}
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

                  <label htmlFor="cameraInput" className="cursor-pointer absolute left-[-20px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h11M9 21l3-3-3-3M16 13l3-3-3-3"
                      />
                    </svg>
                    <input
                      type="file"
                      capture="environment"
                      id="cameraInput"
                      accept="image/*"
                      onChange={handleCameraCapture}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* for audio */}
                <div
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-10 h-10 cursor-pointer py-2 ${
                    isRecording ? "bg-red-500" : "bg-[#5678E9]"
                  } text-white rounded-full`}
                >
                  <img
                    src="/assets/microphone-white.svg"
                    className="m-auto"
                    alt="microphone"
                  />
                </div>

                {audioBlob && (
                  <div
                    onClick={sendVoiceMessage}
                    className="px-4 py-2 bg-[#FE512E] text-white rounded-lg cursor-pointer"
                  >
                    Send
                  </div>
                )}
              </form>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[86vh] text-lg text-gray-400">
            Select Chat to Start Chatting..!
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
