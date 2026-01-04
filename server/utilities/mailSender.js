const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body ) =>{
    try{
        const transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST ,
            auth : {
                user : process.env.MAIL_USER ,
                pass : process.env.MAIL_PASS,        
            }
        })

        let info = await transporter.sendMail({
            from : 'STUDY NOTION INDIA',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })
        console.log("Sent mail info",info);
        return info;

    }
    catch(error){
        console.log(error);
    }
}

module.exports = mailSender;