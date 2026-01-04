
const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true,
    },
    completedVideo : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subsection",
        required : true,
        }
    ],
    
});

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
module.exports = CourseProgress;