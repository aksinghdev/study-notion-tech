
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");


// create rating and review
exports.createRating = async(req, res) =>{
    // get user id
    // fetch data from req body
    // check user enrolled or not
    // check user already reviewed
    // create rating and review
    // update course for this rating 
    // return responce
    try{
        // get user id
        const userID = req.user.id;
        // fetch data from req body
        const{rating, review, courseid} = req.body;
        // check user enrolled or not
        const courseDetails = await Course.findOne({
                                                    _id : courseid,
                                                    studentEnrolled: {$eleMatch: {$eq: userID}},
                                                });
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "This user not registered in the course",
            });
        }

        // check user already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
                                                    user : userID,
                                                    course : courseid
                                                            });
        if(alreadyReviewed){
            return res.status(400).json({
                success: false,
                message: "Course is Already reviwed by this user",
            });
        }
        // create rating and review
        const ratingReview = await RatingAndReview.create({
                                            rating, review,
                                            user: userID,
                                            course : courseid,
        });
        console.log("created rating and review ", ratingReview);
        // update course for this rating 
        const updateCourse = await Course.findByIdAndUpdate({_id: courseid},
                                            {
                                                $push: {
                                                    ratingsAndReviews : ratingReview._id,
                                                },
                                            },
                                            {new: true}
        );
        // return responce
        return res.status(200).json({
            success: true,
            message: "Rating and Review created succefully",
            ratingReview,
        });
    }
    catch(error){
        console.log(error);
        return res.status(402).json({
            success: false,
            message: error.message,
        });
    }
}

// get average rating and review
exports.getAverageRating = async(req, res) =>{
    try{
        // get course ID 
        const courseID = req.body.courseid;
        // calculate average rating
        const result = await RatingAndReview.aggregate([
                                        {
                                            $match:{course: new mongoose.Types.ObjectId(courseID),},
                                            // $match:{course: courseID,},
                                        },
                                        {
                                            $group:{
                                                _id: null,
                                                averageRating: {$avg: "rating"},
                                            },
                                        }
                                        ]);
        // return ratting
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                message: "Average rating founded",
                averageRating: result[0].averageRating,
            });
        }
        // if no any rating review exist
        return res.status(400).json({
            success: false,
            message: "NO any rating founded",
            averageRating: 0,
        });

    }
    catch(error){
        console.log(error);
        return res.status(402).json({
            success: false,
            message: error.message,
        });
    }
}

// get all Rating and Review
exports.getAllRating = async(req, res) =>{
    try{
        const allReview = await RatingAndReview.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path:"User",
                                                    select: "firstName lastName email userImage",
                                                })
                                                .populate({
                                                    path:"Course",
                                                    select:"courseName",
                                                })
                                                .exec();
        return res.status(200).json({
            success: true,
            message:"All review and rating are fetched",
            allReview,
        });
    }
    catch(error){
        console.log(error);
        return res.status(402).json({
            success: false,
            message: error.message,
        });
    }
}