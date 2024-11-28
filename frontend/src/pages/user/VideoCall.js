import React, { useRef, useEffect, useState } from "react";
import { socket } from "../../utils/socket";

const VideoCall = ({ receiver, startCallFromParent }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const pendingCandidates = useRef([]);

  useEffect(() => {
    socket.on("offer", async ({ offer, senderId }) => {
      if (receiver && senderId === receiver._id) {
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
    setIsCalling(true);
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
  };

  const handleReceiveOffer = async (offer) => {
    const peerConnection = createPeerConnection();

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    processPendingCandidates();
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("answer", { answer, receiverId: receiver._id });
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full mx-8 p-6 rounded-lg shadow-lg flex-col md:flex">
        <video ref={localVideoRef} autoPlay muted className="local-video" />
        <video ref={remoteVideoRef} autoPlay className="remote-video" />
      </div>
    </div>
  );
};

export default VideoCall;
