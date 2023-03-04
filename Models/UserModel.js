const mongoose = require("mongoose");


const userModel = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    },
    userMessage : {
        type : String,
        required : true
    }
}, {timestamp : true});


module.exports = mongoose.model("userModel", userModel);