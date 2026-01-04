const mongoose = require("mongoose");
const mailSender = require("../utilities/mailSender");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["admin","student","instructor"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        // required:true
    }],
    token:{
        type : String
    },
    tokenExpTime:{
        type : Date
    },
    courseProgress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
        // required:true
    },
    userImage:{
        type:String,
        required: true
    }
});

// let mailBody = `Dear ${this.firstName} Your password is changed succefully.
//  If it done by you then ignore this message, otherwise take an appropriate action`;
// send email for change password confirmation
async function changePassconfEmail(email) {
    try{
        const mailResponce = await mailSender(email, 'ChangePassword confirmailon email from StudyNotion', "Your password is changed succefully");
    }
    catch(err){
        console.log("Confirmation mail not send ERROR",err);
        return resizeBy.status(401).json({
            success : false,
            message : "Error in sending confirmaion email"
        })
    }
}

// use pre middleware
userSchema.pre("save", async function (next) {
    await changePassconfEmail(this.email);
    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;