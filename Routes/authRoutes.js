const express = require("express");
const { UserRegistration,UserLogin  , ChangePassword} = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/ChangePwd")
const router = express.Router();

router.post("/register" , UserRegistration) ;
router.post("/login" , UserLogin) ;
router.post("/change-password" , authMiddleware , ChangePassword ) ;



module.exports = router ;