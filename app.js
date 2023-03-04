const express = require("express");
const app = express();
const cors = require("cors");
const Router = require("./Routes/UserRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/user", Router);



// Home Route
app.get("/", (req, res) => {
    res.send("Home Route")
});

// 404 Error Route
app.use((req, res, next) => {
    res.send("Route not found")
});

// Server Error
app.use((req, res, next, err) => {
    if(err){
        return err
    }else{
        console.log("server Error")
    }
})


module.exports = app;