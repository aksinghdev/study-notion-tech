
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
        let {courseName, courseDescription, whatYouLearn, tag, category, status, price,instructions} = req.body;
        // parse the tag as string
        if(typeof tag === "string"){
            tag = JSON.parse(tag)
        }

        if(typeof instructions === "string"){
            instructions = JSON.parse(instructions)
        }
        // get file
        const thumbnail = req.files.thumbnailImage;


        // console.log("fetching data--> ",courseName,  courseDescription,  whatYouLearn,  price,  tag,  category,  instructions);
        // console.log("Fetched thumbnail : ",thumbnail);

        // validation of data
        if(!courseName ||
            !courseDescription ||
            !whatYouLearn ||
            !tag || 
            !price ||
            !category ||
            !thumbnail
            ){
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
        // console.log("present Instructor is :___----",Instructor);
        if(!Instructor){
            return res.status(401).json({
                success : false,
                message : 'Instructor not found'
            });  
        }
        // validation for tag 
        const categoryDetails = await Category.findById(category);
        // console.log('categoryDetails is :---',categoryDetails);
        if(!categoryDetails){
            return res.status(402).json({
                success : false,
                message : 'Category details not found'
            });
        }
        // upload thumbnail Image to cloudinary
        let uploadedThumbnail = "";
            if(thumbnail){
                uploadedThumbnail = await fileUploadCloudinary(thumbnail, process.env.FOLDER_NAME,1000,1000);
            }else{
                uploadedThumbnail = {secure_url : ""}
                
            }
            
            // console.log("print uploaded thumbnail--->",uploadedThumbnail);
            
        // create an entry to db for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouLearn,
            price,
			tag: tag,
			category: categoryDetails._id,
			thumbnailImg: uploadedThumbnail.secure_url,
			status: status,
			instructions: instructions,
            instructor : Instructor._id,
        });
        // console.log('created course :----', newCourse);
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
// exports.updateCourse = async (req, res)=>{
//     try{
//         // fetch data form body and file path
//         const {courseName, courseDescription, youWillLearn, tag, category, price, instructions, courseID, status} = req.body;
//         console("print course ID & updates inside edit course controller : ",courseId, updates);
//         // get file
//         const thumbnail = req.files?.thumbnailImg;  // Optional new thumbnail image

//         // data validation 
//         if(!courseID){
//             return res.status(400).json({
//                 success: false,
//                 message: "Course Id inccorect or Not Found"
//             });
//         }
//         const existCourse = await Course.findById(courseID);
//         if(!existCourse){
//             return res.status(400).json({
//                 success: false,
//                 message: "Course Not Found"
//             });
//         }
//         // if update category
//         let newCategory = existCourse.category;
//         if(category){
//             const newCategoryDetails = await Category.findById(category);
//             if(!newCategoryDetails){
//                 return res.status(400).json({
//                     success:false,
//                     message:"this category not found"
//                 });
//             }
//             newCategory = newCategoryDetails._id;
//         }
//         // if update thumbnail image
//         let uploadedThumbnail = existCourse.thumbnail
//         if(thumbnail){
//             const newThumbnail = await fileUploadCloudinary(thumbnail, process.env.FOLDER_NAME);
//             uploadedThumbnail = newThumbnail.secure_url;
//         }

//         // update course data
//         const updateCurseData = await Course.findByIdAndUpdate(
//             courseID,
//             {
//                 courseName: courseName || existCourse.courseName,
//                 courseDescription: courseDescription || existCourse.courseDescription,
//                 whatYouLearn : youWillLearn || existCourse.youWillLearn,
//                 thumbnail : uploadedThumbnail.sequre_url,
//                 price: price || existCourse.price,
//                 tag: tag || existCourse.tag,
//                 category: newCategory,
//                 thumbnail: uploadedThumbnail,
//                 instructions: instructions || existCourse.instructions, 
//                 status: status || existCourse.status,
//             },
//             {new: true}
//         );



        
//         // return responce for successfully course creation
//         return res.status(200).json({
//             success : true,
//             message:'Your course Updated successfully',
//             updateCurseData,
//         });

//     }
//     catch(error){
//         console.log('error occure during create course function:---',error);
//         return res.status(400).json({
//             success : false,
//             message : 'Course not UPdated, Failed!'
//         });
//     }
// }

// new version edit course 
exports.editCourse = async (req, res) =>{
    try{
        // fetch data
        const {courseId } = req.body;
        const updates = req.body    // all updated key store in same variable

        console.log("Print fetched data in edit course : --", courseId ," and udates ", updates);
        // check exist course
        const course = await Course.findById(courseId)
        console.log("print course :  ",course);
        if(!course){
            return res.status(404).json({
                success : false,
                message : "Course not found "
            })
        }

        // if thumbnail found then update it
        if(req.files){
            console.log("Thumbnail mil gya")
            const thumbnail = req.files.thumbnailImg || req.files.thumbnailImage;
            const uploadedThumbnailImage = await fileUploadCloudinary(
                thumbnail,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
            course.thumbnailImg = uploadedThumbnailImage.secure_url;
        }
        // update only requested field , remaining fields have not change
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    // string to array conversion
                    course[key] = JSON.parse(updates[key])   
                }else{
                    course[key] = updates[key]
                }
            }
        }
        //  save course
        await course.save();
        // updated course for response
        const updatedCourse = await Course.findOne({_id : courseId})
            .populate({
                path: "instructor",
                populate :{
                    path : "additionalDetails",
                },
            })
            .populate("ratingsAndReviews")
            .populate({
                path : "courseContent",
                populate : {
                    path : "subsection",
                },
            })
            .exec();
        // return success responce   
        res.json({
            success : true,
            message : "Your course updated successfuly done",
            data : updatedCourse
        })

    }catch(error){
      console.error(error)
      res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
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
        const {courseId} = req.body; 
        // get course details
        console.log("getting course ID--->",courseId);
        const courseDetails = await Course.findById(courseId)
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
            message : error.message,

        });
    }
}

// get all course of an instructor
exports.getInstructorCourses = async (req, res) => {
    console.log("getinstructor courses controller hit");
    try{
        // get instructor id
        const instructorId = req.user.id;

        if(!instructorId){
            return res.status(401).json({
                success : false,
                message : 'Instructor ID not found or Inccorect'
            });  
        }

        // find all courses
        const instructorCourses = await Course.find(
            {instructor : instructorId}
        ).populate({
            path : "courseContent",
            populate: {path : "subsection"}
        })
        .populate("category")
        .populate("ratingsAndReviews")
        .lean()  // to convert plain js object
        .sort({createdAt : -1})

        console.log("Print instructor courses ---> ",instructorCourses);

        // Return the instructor's courses
        res.status(200).json({
        success: true,
        message : "Instructor courses fethed successfuly ",
        data: instructorCourses,
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
    })}
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({success : false, message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subsection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }
    // Delete this course from Category
    await Category.findByIdAndUpdate(
        course.category,
        {
            $pull:{courses : course._id}
        }
    )
    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
