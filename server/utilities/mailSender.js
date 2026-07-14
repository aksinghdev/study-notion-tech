
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const mailSender = async (email, title, body ) =>{
//     console.log("mailsender triger outside try block")
//     try{
//         console.log("mailsender inside try block")
//         const transporter = nodemailer.createTransport({
//             host : process.env.MAIL_HOST ,
//             auth : {
//                 user : process.env.MAIL_USER ,
//                 pass : process.env.MAIL_PASS,        
//             }
//         })

//         let info = await transporter.sendMail({
//             from : 'STUDY NOTION INDIA',
//             to : `${email}`,
//             subject : `${title}`,
//             html : `${body}`,
//         })
//         console.log("Sent mail info",info);
//         return info;

//     }
//     catch(error){
//         console.log(error);
//     }
// }
// module.exports = mailSender;



const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const mailSender = async (email, title, body) => {
    console.log("mailsender triger outside try block")
    try{
        console.log("mailsender inside try block")

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sendSmtpEmail = {
            sender: { email: "krabhishek.8828@gmail.com", name: "STUDY NOTION INDIA" },
            to: [{ email: `${email}` }],
            subject: `${title}`,
            htmlContent: `${body}`,
        };

        let info = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Sent mail info", info);
        return info;

    }
    catch(error){
        console.log(error);
    }
}

module.exports = mailSender;