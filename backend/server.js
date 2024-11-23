const express = require("express");
const app = express();
const cron = require("node-cron");
const mongoose = require("./database/db.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketIo = require('socket.io');
const cors = require("cors");
const dotenv = require("dotenv");
const controller = require("./controllers/maintenance.controller.js");
const http = require('http');

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
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


const userRouter = require("./routes/user.route.js");
const SocietyRouter = require("./routes/society.route.js");
const ownerRoutes = require("./routes/resident.route.js");
const complaintRoutes = require("./routes/complaint.route.js");
const importantNumRoutes = require("./routes/importantnum.route.js");
const forgetPassword = require("./routes/forgetPass.route.js");
const maintenance = require("./routes/maintenance.route.js");
const announcement = require("./routes/announcement.route.js");
const income = require("./routes/income.route.js");
const expenseDetailsRoutes = require('./routes/expansesdetails.route.js');
const notesRoutes = require('./routes/note.route.js');
const facilitiesRoutes = require('./routes/facility.route.js');
const requestsRoutes = require('./routes/request.route.js');
const protocol = require('./routes/protocol.route.js');
const guard = require('./routes/guard.route.js');
const visitors = require('./routes/visitors.route.js');
const notificationRoutes = require('./routes/notification.routes.js');
const polls = require('./routes/polls.route.js')
const chatRoutes = require('./routes/chat.routes.js');
const Message = require("./models/Message.js");
const GroupChat = require('./models/groupMessage.model.js');
const Resident = require("./models/resident.model.js");
const User = require("./models/user.model.js");

app.get("/", (req, res) => {
  res.send("Welcome...!!");
});

app.use('/users', userRouter);
app.use('/society', SocietyRouter);
app.use('/forgetpassword', forgetPassword);
app.use('/api/complaints', complaintRoutes);
app.use('/api/numbers', importantNumRoutes);
app.use('/api/maintenance', maintenance);
app.use('/api/resident', ownerRoutes);
app.use('/api/announcement', announcement);
app.use('/api/income', income);
app.use('/api/expenses', expenseDetailsRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/protocol', protocol);
app.use('/api/guard', guard);
app.use('/api/visitors', visitors);
app.use('/api/user/polls', polls);
app.use('/api/notifications', notificationRoutes);
app.use('/api/polls', polls)
app.use('/api/chat', chatRoutes);


io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', ({ userId, receiverId }) => {
    socket.userId = userId;
    socket.receiverId = receiverId;
  });

  // socket.on('private message', async ({ message,senderId, receiverId }) => {
  //   const newMessage = new Message({ senderId, receiverId, message });
  //   await newMessage.save();
  //   io.to(socket.id).emit('private message', newMessage);
  //   const receiverSocket = Array.from(io.sockets.sockets.values()).find(s => s.userId === receiverId);
  //   if (receiverSocket) receiverSocket.emit('private message', newMessage);
  // });

  // socket.on('media message', async ({ senderId, receiverId, mediaUrl }) => {
  //   const newMessage = new Message({ senderId, receiverId, mediaUrl });
  //   // await newMessage.save();
  //   io.to(socket.id).emit('media message', newMessage);
  //   const receiverSocket = Array.from(io.sockets.sockets.values()).find(s => s.userId === receiverId);
  //   if (receiverSocket) receiverSocket.emit('media message', newMessage);
  // });

  socket.on('message', ({ senderId, receiverId, message, mediaUrl }) => {
    try {
      const newMessage = { senderId, receiverId, message, mediaUrl };
      io.to(socket.id).emit('message', newMessage);
      const receiverSocket = Array.from(io.sockets.sockets.values()).find(s => s.userId === receiverId);
      if (receiverSocket) {
        receiverSocket.emit('message', newMessage);
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });


  socket.on('joinGroup', async ({ userId, groupId }) => {
    try {
      const groupChat = await GroupChat.findById(groupId);
      if (!groupChat) {
        socket.emit('error', { message: 'Group not found' });
        return;
      }

      const isResident = await Resident.findById(userId);
      const isUser = await User.findById(userId);

      if (!isResident && !isUser) {
        socket.emit('error', { message: 'User not found in either Residents or Users' });
        return;
      }

      socket.userId = userId;
      socket.groupId = groupId;

      socket.join(groupId);
      console.log(`User ${userId} joined group ${groupId}`);

      socket.emit('groupMembers', groupChat.groupMembers);
    } catch (error) {
      console.error("Error while user joining the group:", error);
      socket.emit('error', { message: 'Error joining group' });
    }
  });

  socket.on('sendGroupMessage', async ({ senderId, groupId, message, mediaUrl }) => {
    try {
      const groupChat = await GroupChat.findById(groupId);
      if (!groupChat) {
        socket.emit('error', { message: 'Group not found' });
        return;
      }

      const newMessage = { senderId, message, mediaUrl, createdAt: new Date() };

      groupChat.messages.push(newMessage);
      await groupChat.save();

      io.to(groupId).emit('groupMessage', newMessage);
    } catch (error) {
      console.error("Error sending group message:", error);
      socket.emit('error', { message: 'Error sending message' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.userId} disconnected`);
  });
});


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
