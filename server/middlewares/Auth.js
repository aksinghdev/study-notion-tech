
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


exports.Auth = async (req, res, next) =>{
    // find token that sends with cookies and body
    try{
        // token extraction
        console.log("before Token extraction");
        const token = req.cookies.token ||
        req.body.token ||
        req.header("Authorization").replace("Bearer ", "");
        console.log("After Token extraction");
        
        if(!token){
            return res.status(500).json({
                success : false,
                messagge : "Token not Found"
            });
        }
        // verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                success : false,
                messagge : "Token not matched"
            });
        }
        next();
    }
    catch(err){
        console.log("error ocured in middleware cookies validation",err);
        return res.status(500).json({
            success : false,
            messagge : "Coockies not verified clearly"
        });
    }
}
//  is Student 
exports.isStudent = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "student"){
             return res.status(401).json({
                success : false,
                messagge : "this is a protected route for student only",
             });
        }
        next();
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success : false,
            messagge : "User role cannot be verified, plese try again"
        });
    }
}

// isInstructer 

exports.isInstructor = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "instructor"){
             return res.status(401).json({
                success : false,
                messagge : "this is a protected route for instructer only",
             });
        }
        next();
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success : false,
            messagge : "User role cannot be verified, plese try again"
        });
    }
}

// isAdmin code

exports.isAdmin = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "admin"){
             return res.status(401).json({
                success : false,
                messagge : "this is a protected route for Admin only",
             });
        }
        next();
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success : false,
            messagge : "User role cannot be verified, plese try again"
        });
    }
}