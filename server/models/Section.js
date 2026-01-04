
const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName : {
        type : String,
        required : true,
    },
    subsection : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subsection",
        required : true,
    }],  
});

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;