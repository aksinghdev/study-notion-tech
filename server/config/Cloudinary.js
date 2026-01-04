const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const dbcloudinary = () =>{
    try{
        cloudinary.config(
            {
                cloud_name : process.env.CLOUD_NAME,
                api_key : process.env.API_KEY,
                api_secret : process.env.API_SECRET,
            }
        )
        console.log("clodinary connection done");
        }
    catch(error){
        console.log("cloudinary db connection fail");
        console.error(error);
    }
};

module.exports = dbcloudinary;
