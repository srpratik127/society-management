const express=require('express')



const app = express();


app.get("/", (req, res) => {
res.send("server is ready")
})

app.listen(5000, () => {
    console.log("server is started 5000");
})