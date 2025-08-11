require("dotenv").config();
const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/ChangePwd");

const UserRegistration = async (req , res)=>{
    try {

        const {name , email , password} = req.body ;

        if(!name || !email || !password){
            return res.status(400).json({
                success : false ,
                message : "All fields are required"
            })
        }
        if(password.length<8){
            return res.status(400).json({
                success : false ,
                message : "Password must be at least 8 characters long"
            })
        }


        const ExistingEmail = await User.findOne({email});
        if(ExistingEmail){
            return res.status(400).json({
                success : false ,
                message : "User exists already" 
            })
        }


        // encrypting password to store in the MONGODB
        const saltRounds = parseInt(process.env.SaltRounds) || 10 ;
        const hashedPwd = await bcrypt.hash(password , saltRounds);
        
       

        // creating new User 

        const NewUser = new User ({
            name ,
            email ,
            password : hashedPwd
        })

        
        await NewUser.save();

        if(NewUser){
            res.status(201).json({
                success: true ,
                message : "User created successfully" ,
                data : {
                    name : NewUser.name ,
                    email : NewUser.email
                }
            })
        } 
    } catch (error) {
        console.log("Error Occured : " , error.message);
        res.status(500).json({
            success : false ,
            message : "Internal Server Error" ,
            error : error.message
        })
    }

}

const UserLogin = async(req , res)=>{
    try {

        const {email , password} = req.body ;

        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : "All fields are required"
            })
        }
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success : false ,
                message : "Register First Please !" 
            })
        }

        const CorrectPwd = await bcrypt.compare(password , user.password); 
        if(!CorrectPwd){
            return res.status(400).json({
                success : false ,
                message : "Invalid Credentials"
            })
        }
        

        // jwt session 

        const payload = {
            userId : user._id ,
            email : user.email ,
           
        }

        const accessToken = jwt.sign( 
            payload,
            process.env.JWT_SECRET_KEY ,
            {expiresIn : "15m"}
        )
         
        res.status(200).json({
            success : true ,
            message : "Logged in successfully" ,
            accessToken
        })    


        
    } catch (error) {
        console.log("Error Occured : " , error.message);
        res.status(500).json({
            success : false ,
            message : "Internal Server Error" ,
            error : error.message
        })
    }
}

const ChangePassword = async(req , res)=>{
    try {
        const {oldPassword , newPassword} = req.body ;
        const userId = req.userInfo.userId ;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success : false ,
                message : "All fields are required"
            })
        };

        if(newPassword.length<8){
            return res.status(400).json({
                success : false ,
                message : "Password must be 8 characters long"
            })
        }
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success : false ,
                message : "User not found"
            })
        }

        const isPwdMatch = await bcrypt.compare(oldPassword , user.password);
        if(!isPwdMatch){
            return res.status(400).json({
                success : false ,
                message : "Invalid Credentials"
            })
        }

        const newHashedPassword = await bcrypt.hash( newPassword , parseInt(process.env.SaltRounds) );
        user.password = newHashedPassword ;
        await user.save();
        res.status(200).json({
            success : true ,
            message : "Password Changed Successfully"
        })

    } catch (error) {
        console.log("Error Occured : " , error.message);
        res.status(500).json({
            success : false ,
            message : "Internal Server Error" ,
            error : error.message
        })
    }
    

}



module.exports = {
    UserRegistration ,UserLogin , ChangePassword
}