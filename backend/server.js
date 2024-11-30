const express = require("express");
const app = express();
const cron = require("node-cron");
const mongoose = require("./database/db.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const controller = require("./controllers/maintenance.controller.js");
const http = require("http");

dotenv.config();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://society-management-tja8.onrender.com/",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
cron.schedule("0 0 * * *", controller.applyPenalties);

const server = http.createServer(app);
const io = socketIo(server, {
  transports: ["websocket", "polling"],
});

const authRouter = require("./routes/auth.route.js");
const SocietyRouter = require("./routes/society.route.js");
const ownerRoutes = require("./routes/resident.route.js");
const complaintRoutes = require("./routes/complaint.route.js");
const importantNumRoutes = require("./routes/importantnum.route.js");
const forgetPassword = require("./routes/forgetPass.route.js");
const maintenance = require("./routes/maintenance.route.js");
const announcement = require("./routes/announcement.route.js");
const income = require("./routes/income.route.js");
const expenseDetailsRoutes = require("./routes/expansesdetails.route.js");
const notesRoutes = require("./routes/note.route.js");
const facilitiesRoutes = require("./routes/facility.route.js");
const requestsRoutes = require("./routes/request.route.js");
const protocol = require("./routes/protocol.route.js");
const guard = require("./routes/guard.route.js");
const visitors = require("./routes/visitors.route.js");
const notificationRoutes = require("./routes/notification.routes.js");
const polls = require("./routes/polls.route.js");
const chatRoutes = require("./routes/chat.routes.js");
const Message = require("./models/Message.js");
const GroupChat = require("./models/groupMessage.model.js");
const Resident = require("./models/resident.model.js");
const User = require("./models/admin.model.js");
const emergencyAlertRoutes = require("./routes/emergencyalert.route.js");

app.get("/", (req, res) => {
  res.send("Welcome...!!");
});

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/society", SocietyRouter);
app.use("/v1/api/forget-password", forgetPassword);
app.use("/v1/api/complaints", complaintRoutes);
app.use("/v1/api/numbers", importantNumRoutes);
app.use("/v1/api/maintenance", maintenance);
app.use("/v1/api/resident", ownerRoutes);
app.use("/v1/api/announcement", announcement);
app.use("/v1/api/income", income);
app.use("/v1/api/expenses", expenseDetailsRoutes);
app.use("/v1/api/notes", notesRoutes);
app.use("/v1/api/facilities", facilitiesRoutes);
app.use("/v1/api/requests", requestsRoutes);
app.use("/v1/api/protocol", protocol);
app.use("/v1/api/guard", guard);
app.use("/v1/api/visitors", visitors);
app.use("/v1/api/notifications", notificationRoutes);
app.use("/v1/api/polls", polls);
app.use("/v1/api/chat", chatRoutes);
app.use("/v1/api/alert", emergencyAlertRoutes);

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("join", ({ userId, receiverId }) => {
    socket.userId = userId;
    socket.receiverId = receiverId;
  });
  socket.on("message", ({ senderId, receiverId, message, mediaUrl }) => {
    try {
      const newMessage = { senderId, receiverId, message, mediaUrl };
      if (senderId === receiverId) {
        io.to(socket.id).emit("message", newMessage);
      } else {
        io.to(socket.id).emit("message", newMessage);
        const receiverSocket = Array.from(io.sockets.sockets.values()).find(
          (s) => s.userId === receiverId
        );
        if (receiverSocket) {
          receiverSocket.emit("message", newMessage);
        }
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  socket.on("joinGroup", async ({ userId, groupId }) => {
    try {
      const groupChat = await GroupChat.findById(groupId);
      if (!groupChat) {
        socket.emit("error", { message: "Group not found" });
        return;
      }

      const isResident = await Resident.findById(userId);
      const isUser = await User.findById(userId);

      if (!isResident && !isUser) {
        socket.emit("error", {
          message: "User not found in either Residents or Users",
        });
        return;
      }

      socket.userId = userId;
      socket.groupId = groupId;

      socket.join(groupId);
      socket.emit("groupMembers", groupChat.groupMembers);
    } catch (error) {
      socket.emit("error", { message: "Error joining group" });
    }
  });

  socket.on("sendGroupMessage", async ({ senderId, groupId, message, mediaUrl }) => {
      try {
        const groupChat = await GroupChat.findById(groupId).select(
          "groupMembers"
        );
        if (!groupChat) {
          socket.emit("error", { message: "Group not found" });
          return;
        }
        const newMessage = {
          senderId,
          message,
          mediaUrl,
          createdAt: new Date(),
        };
        groupChat.groupMembers.forEach((member) => {
          const memberSocketId = Array.from(io.sockets.sockets.values()).find(
            (s) => s.userId === member._id.toString()
          )?.id;

          if (memberSocketId && member._id.toString() !== senderId) {
            io.to(memberSocketId).emit("receiveGroupMessage", newMessage);
          }
        });
        socket.emit("sendGroupMessage", newMessage);
      } catch (error) {
        socket.emit("error", { message: "Error sending message" });
      }
    }
  );

  // for video call
  socket.on("offer", ({ offer, receiverId }) => {
    const receiverSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === receiverId
    );
    if (receiverSocket) {
      receiverSocket.emit("incoming-call", { senderId: socket.userId });
      receiverSocket.emit("offer", { offer, senderId: socket.userId });
    }
  });

  socket.on("answer", ({ answer, receiverId }) => {
    const receiverSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === receiverId
    );
    if (receiverSocket) {
      receiverSocket.emit("answer", { answer, senderId: socket.userId });
    }
  });

  socket.on("ice-candidate", ({ candidate, receiverId }) => {
    const receiverSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === receiverId
    );
    if (receiverSocket) {
      receiverSocket.emit("ice-candidate", {
        candidate,
        senderId: socket.userId,
      });
    }
  });

  socket.on("call-ended", ({ receiverId }) => {
    const receiverSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === receiverId
    );

    if (receiverSocket) {
      receiverSocket.emit("call-ended");
    }
  });

  socket.on("disconnect", () => {
    console.log(`${socket.userId} disconnected`);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
