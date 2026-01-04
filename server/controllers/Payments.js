const {instance} = require('../config/Razorpay');
const User = require('../models/User');
const Course = require("../models/Course");
const mailSender = require('../utilities/mailSender');
const { default: mongoose } = require('mongoose');
// const mongoose = require("mongoose");




// capture the payment and initiate the Razorpay order 
exports.capturePayment = async (req, res) =>{
    // get course id and user id 
    // validate the fetched id 
    // check and validate course details
    // check user already enrolled or not
    // create order 
    // return response

        // get course id and user id 
        const {course_id} = req.body;
        const uid = req.user.id;
        // validate the fetched id 
        if(!course_id || !uid){
            return res.status(400).json({
                success: false,
                message: "user_ID or Course_ID not found"
            });
        }

        // check and validate course details
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success: false,
                    message: " Course Details not found"
                });   
            }
        // check user already enrollment
            const userID = new mongoose.Types.ObjectId(uid)
            if(course.studentEnrolled.includes(userID)){
                return res.status(400).json({
                    success: false,
                    message: "This user already enrolled the same courses"
                });
            }
        }
        catch(e){
            return res.status(400).json({
                success: false,
                message: e.message,
            });
        }

        // create order 
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount : amount*100,
            currency,
            recipt : Math.random(Date.now()).toString(),
            notes :{
                CourseID : course_id,
                uid,
            }
        }
        // initiate the payment
        try{
            const paymentResponce = await instance.orders.create(options);
            console.log('initiated pament responce==', paymentResponce);
            // return response
        return res.status(200).json({
            success: true,
            CourseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail: course.thumbnail,
            orderid:paymentResponce.id,
            currency:paymentResponce.currency,
            amount:paymentResponce.amount,
            message: "Payment Initiated succefully Done"
        });
        }
        catch(error){
            console.log("Payments not captured please try again after some time",error);
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
};

// verify signature for check authenticity
exports.verifySignature = async(req, res) =>{
    const webhookSecret = '12345678';

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature !== digest){
        return res.status(400).json({
            success: false,
            message: "Signature not matched"
        });
    }

    // enroll student for this course
    const{courseID, userID} = req.body.payload.payment.entity.notes;
    // fullfil the action

    try{
        // find the course and enroll the student in it
        const enrolledCourse = await Course.findByIdAndUpdate(
                                            {_id : courseID},
                                            {$push: {studentEnrolled : userID}},
                                            {new : true},
        );
        if(!enrolledCourse){
            return res.status(400).json({
                success: false,
                message: "course not found and user not enrolled"
            });
        }
        console.log(enrolledCourse);

        // find user and update for enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
                                            {_id:userID},
                                            {$push :{courses:courseID}},
                                            {new: true},
        );
        if(!enrolledStudent){
            return res.status(400).json({
                success: false,
                message: "User not found and not update for the courses"
            });
        }
        console.log(enrolledStudent);
        // send confimation mail
        const confirmationMail = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulation! for purchase the course",
                                        "you are succefully enrolled the course"
        );

        // return response

        return res.status(200).json({
            success: true,
            message: "Signature verified and Courses added succefully"
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Signature not verify"
        });
    }
};