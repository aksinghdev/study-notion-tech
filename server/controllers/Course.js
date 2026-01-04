const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const {fileUploadCloudinary} = require("../utilities/FileUpload");


// Create course handeler function
    // 1. fetch data from user body with thumbnail file
    // 2. validate data  
    // 3. find user by id fetched from token 
    // 4. validate tag get from user
    // 5. upload thumbnail image to cloudinary 
    // 6. create new course to database
    // 7. update user schema for this new course 
    // 8. update tag schema for this new course
    // 9. return successfull response

exports.createCourse = async (req, res ) =>{
    try{
        // fetch data form body and file path
        let {courseName, courseDescription, youWillLearn, tag,category, status, price,instructions} = req.body;
        // get file
        const thumbnail = req.files.thumbnailImg;

        console.log("fetching data--> ",courseName,  courseDescription,  youWillLearn,  price,  tag,  category,  instructions);

        // validation of data
        if(!courseName || !courseDescription || !youWillLearn || !tag || !price || !category || !thumbnail){
            return res.status(401).json({
                success : false,
                message : 'Please provide all details and file'
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        // check and get instructor
        const userId = req.user.id;
        const Instructor = await User.findById(userId);
        console.log("present Instructor is :___----",Instructor);
        if(!Instructor){
            return res.status(401).json({
                success : false,
                message : 'Instructor not found'
            });  
        }
        // validation for tag 
        const categoryDetails = await Category.findById(category);
        console.log('categoryDetails is :---',categoryDetails);
        if(!categoryDetails){
            return res.status(402).json({
                success : false,
                message : 'Category details not found'
            });
        }
        // upload thumbnail Image to cloudinary
        const uploadedThumbnail = await fileUploadCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry to db for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouLearn : youWillLearn,
            thumbnail : uploadedThumbnail.sequre_url,
            price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: uploadedThumbnail.secure_url,
			status: status,
			instructions: instructions,
            instructor : Instructor._id,
        });
        console.log('created course :----', newCourse);
        // update user schema
        await User.findByIdAndUpdate(
            {_id : Instructor._id},
            {
                $push: {
                    courses : newCourse._id,
                }
            },
            {new : true},
        )
        //  update tag scheema for this new course
        // * dought *
        await Category.findByIdAndUpdate(
            {_id : categoryDetails._id},
            {
                $push: {
                    courses : newCourse._id,
                }
            },
            {new : true}
        )
        // return responce for successfully course creation
        return res.status(200).json({
            success : true,
            message:'Your course created successfully',
            newCourse,
        });

    }
    catch(error){
        console.log('error occure during create course function:---',error);
        return res.status(400).json({
            success : false,
            message : 'Course not created, Failed!'
        });
    }
};

// Edit course handler
exports.updateCourse = async (req, res)=>{
    try{
        // fetch data form body and file path
        const {courseName, courseDescription, youWillLearn, tag, category, price, instructions, courseID, status} = req.body;
        // get file
        const thumbnail = req.files?.thumbnailImg;  // Optional new thumbnail image

        // data validation 
        if(!courseID){
            return res.status(400).json({
                success: false,
                message: "Course Id inccorect or Not Found"
            });
        }
        const existCourse = await Course.findById(courseID);
        if(!existCourse){
            return res.status(400).json({
                success: false,
                message: "Course Not Found"
            });
        }
        // if update category
        let newCategory = existCourse.category;
        if(category){
            const newCategoryDetails = await Category.findById(category);
            if(!newCategoryDetails){
                return res.status(400).json({
                    success:false,
                    message:"this category not found"
                });
            }
            newCategory = newCategoryDetails._id;
        }
        // if update thumbnail image
        let uploadedThumbnail = existCourse.thumbnail
        if(thumbnail){
            const newThumbnail = await fileUploadCloudinary(thumbnail, process.env.FOLDER_NAME);
            uploadedThumbnail = newThumbnail.secure_url;
        }

        // update course data
        const updateCurseData = await Course.findByIdAndUpdate(
            courseID,
            {
                courseName: courseName || existCourse.courseName,
                courseDescription: courseDescription || existCourse.courseDescription,
                whatYouLearn : youWillLearn || existCourse.youWillLearn,
                thumbnail : uploadedThumbnail.sequre_url,
                price: price || existCourse.price,
                tag: tag || existCourse.tag,
                category: newCategory,
                thumbnail: uploadedThumbnail,
                instructions: instructions || existCourse.instructions, 
                status: status || existCourse.status,
            },
            {new: true}
        );



        
        // return responce for successfully course creation
        return res.status(200).json({
            success : true,
            message:'Your course Updated successfully',
            updateCurseData,
        });

    }
    catch(error){
        console.log('error occure during create course function:---',error);
        return res.status(400).json({
            success : false,
            message : 'Course not UPdated, Failed!'
        });
    }
}

// get all cources handler

exports.showAllCourses = async (req, res ) =>{
    try{
        const allCourses = await Course.find({}, {
             courseNameName : true,
             courseDescription : true,
             price : true,
             whatYouLearn : true,
             instructor : true
            });
        return res.status(200).json({
            success : true,
            message : 'All Courses are Found and  returned You Successfully',
            allCourses
        });
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success : false,
            message : 'Course not found',
            error : error.message,
        });
    }
};

// get course full details 
exports.getCourseDetails = async(req, res)=>{
    try{
        // get course ID
        const courseId = req.body; 
        // get course details
        console.log("getting course ID--->",courseId);
        const courseDetails = await Course.find(courseId)
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{path :"subsection"},
                                                })
                                                .populate("studentEnrolled")
                                                .populate({
                                                    path:"instructor",
                                                    populate:{path:"additionalDetails"},
                                                })
                                                .populate("ratingsAndReviews")
                                                .populate("category")
                                                .exec();

        // validation of geting data
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : `Could not found find the Course with ${courseId} ID`,
                error : error.message,
            }); 
        }

        // return responce 19422 adi exp
        return res.status(200).json({
            success : true,
            message : 'Course details found successfully done with given id',
            data: courseDetails,
        });
    }
    catch(error){
        console.log(error);
        return res.status(502).json({
            success: false,
            message : error.message
        });
    }
}
