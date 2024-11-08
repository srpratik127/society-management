const express = require("express");
const app = express();
const mongoose = require("./database/db.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
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

const userRouter = require("./routes/user.route.js");
const SocietyRouter = require("./routes/society.route.js");
const ownerRoutes = require("./routes/resident.route.js");
const complaintRoutes = require("./routes/complaint.route.js");
const importantNumRoutes = require("./routes/importantnum.route.js");
const forgetPassword = require("./routes/forgetPass.route.js");
const maintenance = require("./routes/maintenance.route.js");
const announcement = require("./routes/announcement.route.js");
const activity = require("./routes/activity.route.js");
const income = require("./routes/income.route.js");
const expenseDetailsRoutes = require('./routes/expansesdetails.route.js');
const notesRoutes = require('./routes/note.route.js');
const facilitiesRoutes = require('./routes/facility.route.js');
const requestsRoutes = require('./routes/request.route.js');
const protocol = require('./routes/protocol.route.js');
const guard = require('./routes/guard.route.js');

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
app.use('/api/activity', activity);  
app.use('/api/income', income);  
app.use('/api/expenses', expenseDetailsRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/protocol', protocol);
app.use('/api/guard', guard);

const port = process.env.PORT || 5000;  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
