const express = require('express');
const mongoose = require('./database/db.js'); 
const userRouter = require('./routes/user.routes.js'); 
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001; 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', userRouter);

app.get("/", (req, res) => {

    res.send("Welcome...!!")

})


app.listen(5000, () => {
    console.log("server is running on 5000");
})
