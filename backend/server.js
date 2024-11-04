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

app.get("/", (req, res) => {
  res.send("Welcome...!!");
});
app.use("/users", userRouter);
app.use("/forgetpassword", forgetPassword);
app.use("/society", SocietyRouter);
app.use("/api/important-number", importantNumRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/maintenance", maintenance);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
