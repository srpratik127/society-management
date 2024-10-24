const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('./database/db.js');
const userRouter = require('./routes/user.routes.js');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;  

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);  

app.get("/", (req, res) => {
    res.send("Welcome...!!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
