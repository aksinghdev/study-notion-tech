
const mongoose = require("mongoose");
const mailSender = require("../utilities/mailSender");
const otpTemplate = require("../emailTemplates/otpVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
    },
    otp : {
        type : String,
        required : true,
        trim : true,
    },
    createdAt : {
        type : Date,
        default: Date.now(),
        expires : 10*60,
        required : true,
    },  
});

// send email otp 
async function sendEmailOtp(email, otp) {
    const body = otpTemplate(otp);
    try{
        const mailresponce = await mailSender(email, 'Verification Email from StudyNotion',body );
        console.log("OTP sent successfully");
        console.log("mail response after sent mail",mailresponce);
    }
    catch(error){
        console.log("error fetching in sending mail for otp",error);
        throw error;
    }
}
// use pre middleware for sending email before save the data in database
otpSchema.pre("save",async function (next) {
    await sendEmailOtp(this.email, this.otp);
    next();
})

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;