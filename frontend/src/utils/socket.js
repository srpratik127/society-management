import { io } from "socket.io-client";

export const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ["websocket"],
  withCredentials: true,
});