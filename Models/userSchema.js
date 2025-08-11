const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name : {
        type : String ,
        trim : true ,
        required : true ,
        maxlength : [100 , "cannot be greater than 100"]
    },
    email : {
        type : String ,
        trim : true ,
        lowercase : true ,
        unique : true ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
        trim : true 
        
    }
} , {timestamps : true});

module.exports = mongoose.model("User" , userSchema);