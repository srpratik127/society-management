const express = express();


const app = express();


app.get("/", (req, res) => {

    res.send("Welcome...!!")

})


app.listen(5000, () => {
    console.log("server is running on 5000");
})