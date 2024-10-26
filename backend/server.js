const express = require('express');
const app = express();
const mongoose = require('./database/db.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const userRouter = require('./routes/user.routes.js');
const SocietyRouter = require('./routes/society.route.js');
const complaintRoutes = require('./routes/complaint.routes.js');
const importantNumRoutes = require('./routes/importantnum.routes.js'); 
const forgetPassword = require('./routes/forgetPass.route.js');

app.get("/", (req, res) => {
    res.send("Welcome...!!");
});

app.use('/users', userRouter);  
app.use('/society', SocietyRouter);  
app.use('/api', complaintRoutes);
app.use('/api', importantNumRoutes);
app.use('/forgetpassword', forgetPassword);  


mongoose 
const port = process.env.PORT || 5000;  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
