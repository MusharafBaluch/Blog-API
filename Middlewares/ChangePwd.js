require("dotenv").config();
const authController = require("../Controllers/authController");
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

const authMiddleware = (req , res , next)=>{
    try {
        
       const authHeader = req.headers['authorization'];
       console.log(authHeader);
       if(!authHeader){
            return res.status(400).json({
                success : false ,
                message : "Login to continue"
            })

       }
       const token = authHeader.split(" ")[1];

       if(!token){
        return res.status(400).json({
            success : false ,
            message : "Login to continue"
        })
       }

       const decodedtoken = jwt.verify(token , process.env.JWT_SECRET_KEY);
       req.userInfo = decodedtoken ;
       console.log(decodedtoken);
       next();

    } catch (error) {
       console.log("Error Occured :" ,  error); 
       res.status(500).json({
            success : false ,
            message : "Internal Server Error"
       })
    }
}

module.exports = authMiddleware;