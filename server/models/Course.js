const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required: true,
    },
    courseDescription:{
        type:String,
        required: true,
    },
    whatYouLearn:{
        type:String,
        // required: true,
    },
    thumbnail:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        // required: true,
    },
    courseContent : [
        {
            type:mongoose.Schema.Types.ObjectId,
                    ref:"Section",
                    required:true
        }
    ],
    studentEnrolled : [
        {
            type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    // required:true
        }
    ],
    instructor : 
        {
            type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required:true
        },
    ratingsAndReviews : [
        {
            type:mongoose.Schema.Types.ObjectId,
                    ref:"RatingAndReview",
                    required:true
        }
    ],
    category : {
        type:mongoose.Schema.Types.ObjectId,
                ref:"Category",
                required:true
    },
    tag : {
        type : [String],
        required:true,
    },
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;