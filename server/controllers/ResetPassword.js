
const User = require("../models/User");
const mailSender = require("../utilities/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// *******************************************
// Reset password Code that send reset link to email  ###
// *******************************************
    // get email from req
    // check user from your db and validate this email
    // generate token 
    // update user with token and expires time
    // create url for reset the password 
    // send mail with url
    // return responce

exports.resetPasswordToken = async (req, res) =>{
    try{
        // get email
        const email = req.body.email;

        // data validate
        if(!email.includes("@") || !email.includes("gmail")){
            return res.status(403).json({
                success :false,
                message: "please enter valid email"
            });
        }
        // check email registration 
        const user = await User.findOne({email : email});
        if(!email){
            return res.status(403).json({
                success :false,
                message: "You are not registered with us"
            }); 
        }
        // token generation 
        const token = crypto.randomUUID();
        // Update user with token
        const updateDetails = await User.findOneAndUpdate(
            {email : email},
            {token : token,
            tokenExpTime : Date.now() + 15*60*1000,
            },
            {new : true}
        );
        // console.log("token exp time:-----",tokenExpTime);
        console.log("Updated user with token:---",updateDetails);
        // create a url for reset the password
        const url = `http://localhost:3000/update-password/${token}`;
        // send mail with url
        await mailSender(email, 'Update password request Link',
                                `please click on the given link to update your password: ${url}`
        );

        // return a success responce
        return res.status(200).json({
            success : true,
            message : "Email sent successfully wit reset link, please go and update your password",
            token
        });
    }
    catch(error){
        console.log("error while fail the try block in reset password", error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, please try again",
            
        });
    }
}

// *****************************************************************
// #############  RESET PASSWORD THROUGH EMAIL RESET LINK ##############
// *****************************************************************
// Reset password after sending the link to your email 
    // fetch data 
    // validate the data
    // matched password
    // get user from db via token
    // if no user found --> invalid token or expire token time
    // hashed pwd
    // update pwd 
    // return res

exports.resetPassword = async (req, res) =>{
    try{
        // fetched data

        console.log("inside redet password controller feched data token:......");
        const {token, newPassword, confirmNewPassword} = req.body;
        console.log("feched data password:......", newPassword);
        console.log("feched data newPassword:......", confirmNewPassword);
        // validate the data
        if(!token || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success : false,
                message : "Please enter all details"
            }); 
        }
        // pwd matcing
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success : false,
                message : "password not matched"
            });
        }
        // get user 
        const user = await User.findOne({token : token});
        // check user
        console.log("user print----",user);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not Found, Invalid token"
            });
        }
        // check token expire time
        if(user.tokenExpTime < Date.now()){
            return res.status(400).json({
                success : false,
                message : "Token is expired, please regenerate the Token"
            });
        }
        // password hashing
        const hashedPass = await bcrypt.hash(confirmNewPassword, 10);
        // update password 
        const updatedUser = await User.findOneAndUpdate(
            {token : token},
            {
                password : hashedPass,
                token: undefined,
                tokenExpTime: undefined,
            },
            {new : true}
        );
        console.log("updated user is :----->",updatedUser);
        // return responce
        return res.status(200).json({
            success : true,
            message : "Your password updated Succefully",
            email: updatedUser.email,
        });
    }
    catch(e){
        console.log("error while fail try block after link open for reset pwd",e);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, when reset password after link clicked"
        });
    }
};