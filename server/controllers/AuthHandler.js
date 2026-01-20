const User = require("../models/User");
const OTP = require("../models/Otp");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cookies = require("cookies");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { json } = require("express");
const { useId } = require("react");
const { data } = require("react-router-dom");

// Send otp for sign up Handler
exports.sendOTP = async (req ,res)=>{
    
    try{
        // fetching data from request
        const{email} = req.body;
        console.log("getting Email today ->",email);
        // check email existance
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({
                success : false,
                message : "this user already registered",
            })
        }
        // if not registered, send OTP
                                            // var otp = otpGenerator.generate(6,{
                                            //     upperCaseAlphabets : false,
                                            //     lowerCaseAlphabets : false,
                                            //     specialChars : false,
                                            // });
                                            // console.log("Generated OTP:--",otp);

                                            // // check otp unique or not
                                            // const uniqueOTP = await OTP.findOne({ otp:otp});
                                            // // console.log(uniqueOTP);
                                            // console.log("check for unique otp");
                                            // // if not unique then generate another and check again and again, untill get unique
                                            // while(!uniqueOTP){
                                            //     otp = otpGenerator.generate(6,{
                                            //         upperCaseAlphabets : false,
                                            //         lowerCaseAlphabets : false,
                                            //         specialChars : false,
                                            // });
                                            // // uniqueOTP = await OTP.findOne({otp: otp});
        //                                     console.log("check for unique otp--2");
        // // save this otp to db
        // const otpBody = {email, otp};
        // // create an entry to DB
        // const saveOTP = await OTP.create(otpBody);
        // console.log("saved OTP:-->",saveOTP);

        // return res.status(200).json({
        //     success : true,
        //     message : "OTP sent successfully",
        //     otp,
        // });
        // } 

        let uniqueOTP = null;
        do{
            var otp = otpGenerator.generate(6,{
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            });
            uniqueOTP = await OTP.findOne({ otp });
        }while(uniqueOTP);

        console.log("check for unique otp--2");
        // save this otp to db
        const otpBody = {email, otp};
        // create an entry to DB
        const saveOTP = await OTP.create(otpBody);
        console.log("saved OTP:-->",saveOTP);

        return res.status(200).json({
            success : true,
            message : "OTP sent successfully",
            otp,
        });

        

    }
    catch(error){
        console.error(error);
        return res.status(401).json({
            success : false,
            message : "OTP not sent, please try again"
        })
    }     
}

// Sign Up handler
    // 1. fetch data from responce
    // 2. validate the data 
    // 3. match both pass fetched from responce
    // 4. check user already rgistered or not
    // 5. find most resent otp
    // 6. validate otp
    // 7. hash password
    // 8. entry created in DB
    // 9. return responce

    exports.signUp = async (req, res) =>{
        try{
            const {
                firstName, lastName, email, password, confirmPassword, accountType, contactNumber,otp
            } = req.body

            // validate the data
            if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber){
                return res.status(402).json({
                    success :false,
                    message: "please enter All details carefuly"
                });
            }
            // match both password
            if(password !== confirmPassword){
                return res.status(402).json({
                    success :false,
                    message: "password not matched, please enter password carefuly"
                });
            }

            // check for existing user 
            const existUser = await User.findOne({email});
            if(existUser){
                return res.status(403).json({
                    success:false,
                    message: "This User already registered, please go for login",
                });
            }
            // get recent otp 
            console.log("user email is--->",email);
            const recentOTP = await OTP.findOne({email}).sort({ createdAt: -1 }).limit(1);
            
            console.log("getting recent otp:-->",recentOTP.otp);
            // validation of otp
            if(!recentOTP){
                return res.status(401).json({
                    success: false,
                    message: "OTP not found"
                }); 
            }
            // matching the otp
            if(recentOTP.otp !== otp){
                return res.status(405).json({
                    success: false,
                    message: "Invalid otp"
                });
            }
            // password hashing
            const hashedPass = await bcrypt.hash(password, 10);
            // create a profile entry to db for additional details in user schema
            const profileDetails = await Profile.create({
                gender:null,
                dob:null,
                about:null,
                highestEducation:null,
                occupation:null,
                contactNo:null,
            });
            // save a entry to the DB
            const createdUser = await User.create({
                firstName,
                lastName, 
                email, 
                password : hashedPass,  
                accountType, 
                additionalDetails: profileDetails._id,
                contactNumber,
                userImage: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            });
            console.log("created User is:-->",createdUser);
            // return successful responce
            return res.status(200).json({
                success: true,
                message: "User registered succefully",
                createdUser
            })
        }
        catch(error){
            console.error(error);
            return res.status(406).json({
                success: false,
                message: "Sign UP error, user cannot register, please try again"
            });
        }
    }


// Login Handler
        // 1. data fetching from req body
        // 2. data validation 
        // 3. check user exist or not
        // 4. match password 
        // 5. generate JWT
        // 6. create cookie
        // 7. send responce
    
    exports.login = async (req, res) => {
        try{
            // data fetching from req body
            const {email, password, AccountType} = req.body;
            console.log("fetching data from res-->", email, password, AccountType);

            // data validation
            if(!email || !password){
                return res.status(402).json({
                    success :false,
                    message: "please enter All details carefuly"
                });
            }
            else if(!email.includes("@") || !email.includes("gmail")){
                return res.status(403).json({
                    success :false,
                    message: "please enter valid email"
                });
            }
            
            // check user exist or not
            const existUserLogin = await User.findOne({email});
            if(!existUserLogin){
                return res.status(404).json({
                    success :false,
                    message: "User not register, please go to signUp"
                });
            }
            // check Account type
            if(existUserLogin.accountType !== AccountType){
                return res.status(405).json({
                    success :false,
                    message: "Account type not matched, please go to signUp"
                });
            }

            // match password
            if(await bcrypt.compare(password, existUserLogin.password)){

                const payload = {
                    email : existUserLogin.email,
                    id : existUserLogin._id,
                    accountType : existUserLogin.accountType,
                }
                // create token
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn : '2h'
                } );
                // may be need to convert in the object form
                existUserLogin.token = token;
                existUserLogin.password = undefined;
                const options = {
                    expires : new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly : true,
                }

                // create cookie
                console.log("cookies creation");
                res.cookie("token",token, options).status(201).json({
                    success : true,
                    existUserLogin,
                    token,
                    message : "Logged In Successfully"
                });
            } else{
                return res.status(404).json({
                    success : false,
                    message : "Invalid Password",
                });
            }
        }    
        catch(error){
            console.log("error getting during login", error);
            return res.status(401),json({
                success : false,
                message : "user not loggedIn please try again"
            });
        }
    }

// Reset password Handler
    // get data from req body
    // get oldPassword, NewPassword, confirmNewPassword
    // validate password
    // change and update password in db
    // dend mail for change password
    // return responce

    exports.changePassword = async (req, res) =>{
        try{
            console.log("inside change password controller called");
            // fetch user id from auth middleware
            const userId = req.user.id;

            // fetch data 
            const { oldPassword, newPassword, confirmPassword} = req.body;
            console.log("inside change password fetched data from req.body:-->",
                oldPassword,
                newPassword,
                confirmPassword
            );

            // data validation
            if(!oldPassword || !newPassword || !confirmPassword ){
                return res.status(401).json({
                    success : false,
                    message : "Please Enter Input Fields"
                });
            }
            // match new and confirm new password
            if(newPassword !== confirmPassword){
                return res.status(402).json({
                    success : false,
                    message : "Confirm password not matched, please Enter again"
                });
            }
            
            // find user in db
            const user = await User.findById(userId);
            // if user not found
            if(!user){
                return res.status(402).json({
                    success : false,
                    message : "User not register here, please go and SignUp"
                });
            }
            // user foud then compare old password 
            const isPasswordMatch = await bcrypt.compare(
                oldPassword,
                user.password
            )

            if(!isPasswordMatch){
                return res.status(403).json({
                    success:false,
                    message: "Current password incorrect"
                })
            }
            // hash password
            const hashPassword = await bcrypt.hash(confirmPassword,10); 
            // update user password
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {password: hashPassword},
                {
                    new: true,
                    runValidators : true
                }
            )
            // return success status
            return res.status(200).json({
                success: true,
                message: "Your password updated succefully",
                data:updatedUser
            })
        }
        catch(error){
            console.log(error);
            return res.status(404).json({
                success : false,
                message : "Password change error, please try again"
            });
        }
    }
