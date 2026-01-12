const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        enum : ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"],
    },
    dob:{
        type:String,
        trim : true
    },
    about:{
        type:String,
        trim : true
    },
    highestEducation:{
        type:String,
    },
    occupation:{
        type:String,
        
    },
    contactNo:{
        type : Number,
        trim: true
    }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;