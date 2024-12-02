import React, { useRef, useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const VideoCall = ({ receiver, startCallFromParent, setStartVideoCall }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const pendingCandidates = useRef([]);
  const userId = useSelector((store) => store.auth.user._id);

  useEffect(() => {
    socket.on("offer", async ({ offer, senderId }) => {
      if (receiver && senderId === receiver._id) {
        toast.success(`Incoming call from ${senderId}`);
        await handleReceiveOffer(offer);
      }
    });

    socket.on("answer", async ({ answer, senderId }) => {
      if (receiver && senderId === receiver._id) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        processPendingCandidates();
      }
    });

    socket.on("ice-candidate", async ({ candidate, senderId }) => {
      if (receiver && senderId === receiver._id) {
        handleIceCandidate(candidate);
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [receiver]);

  useEffect(() => {
    if (startCallFromParent) {
      startCall();
    }
  }, [startCallFromParent]);

  const startCall = async () => {
    if (userId === receiver._id) {
      toast.error("You cannot call yourself!");
      setStartVideoCall(false);
      setIsCalling(false);
      return;
    }

    setIsCalling(true);
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = localStream;

      const peerConnection = createPeerConnection();
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit("offer", { offer, receiverId: receiver._id });
    } catch (error) {
      handleMediaError(error);
      setIsCalling(false);
    }
  };

  const handleReceiveOffer = async (offer) => {
    try {
      const peerConnection = createPeerConnection();

      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = localStream;

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      if (peerConnection.signalingState !== "stable") {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
      } else {
        console.error(
          "RTCPeerConnection is in an invalid state to set remote description"
        );
      }

      processPendingCandidates();

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit("answer", { answer, receiverId: receiver._id });
    } catch (error) {
      handleMediaError(error);
    }
  };

  const handleIceCandidate = (candidate) => {
    if (peerConnectionRef.current.remoteDescription) {
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
      pendingCandidates.current.push(candidate);
    }
  };

  const processPendingCandidates = () => {
    if (pendingCandidates.current.length > 0) {
      pendingCandidates.current.forEach((candidate) =>
        peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        )
      );
      pendingCandidates.current = [];
    }
  };

  const createPeerConnection = () => {
    if (peerConnectionRef.current) return peerConnectionRef.current;

    const peerConnection = new RTCPeerConnection();
    peerConnectionRef.current = peerConnection;

    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          receiverId: receiver._id,
        });
      }
    };

    return peerConnection;
  };

  const handleEndCall = () => {
    setStartVideoCall(false);
    setIsCalling(false);
    if (!receiver || !receiver._id) {
      setIsCalling(false);
      console.error("Receiver is not defined");
      return;
    }

    socket.emit("call-ended", { receiverId: receiver._id });

    if (localVideoRef.current?.srcObject) {
      const tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current?.srcObject) {
      const tracks = remoteVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  };

  useEffect(() => {
    socket.on("call-ended", () => {
      toast.success("Call ended by the other participant.");
      handleEndCall();
    });

    return () => {
      socket.off("call-ended");
    };
  }, []);

  useEffect(() => {
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, []);

  const handleMediaError = (error) => {
    if (error.name === "NotAllowedError") {
      toast.error(
        "Camera or microphone access denied. Please allow permissions."
      );
    } else if (error.name === "NotFoundError") {
      toast.error("No camera or microphone found. Please connect them.");
    } else if (error.name === "OverconstrainedError") {
      toast.error(
        `The constraints cannot be satisfied. Check if your device supports the requested settings.`
      );
    } else {
      toast.error(
        "An unexpected error occurred while accessing media devices."
      );
    }
  };

  return (
    <div className="relative">
      {isCalling && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[90%] h-[90vh] mx-8 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-lg font-medium">Video Call</h2>
              <button
                className="p-3 py-2 bg-red-500 text-white rounded"
                onClick={handleEndCall}
              >
                End Call
              </button>
            </div>
            <div className="flex gap-3">
              <video ref={localVideoRef} autoPlay muted className="w-[50%]" />
              <video ref={remoteVideoRef} autoPlay className="w-[50%]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
