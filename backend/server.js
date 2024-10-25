const express = require('express');
const app = express();
const mongoose = require('./database/db.js');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

//Body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const userRouter = require('./routes/user.routes.js');
const SocietyRouter = require('./routes/society.route.js');

app.get("/", (req, res) => {
    res.send("Welcome...!!");
});

app.use('/users', userRouter);  
app.use('/society', SocietyRouter);  


mongoose 
const port = process.env.PORT || 5000;  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
