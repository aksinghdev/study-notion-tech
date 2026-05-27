
const Section = require("../models/Section");
const Course = require('../models/Course');
const Subsection = require("../models/Subsection");


exports.creatSection = async (req , res ) =>{
    try{
        // fetch data 
        const {sectionName, courseID} = req.body;
        console.log("fetched section data", sectionName, courseID);
        // validate the data
        if(!sectionName || !courseID){
            return res.status(401).json({
                success : false,
                message : 'Enter all details '
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        console.log("print new section creted :---",newSection._id);
        // update course with this new section
        const updateCourse = await Course.findByIdAndUpdate(
            courseID,
            {
                $push:{courseContent: newSection._id},
            },
            {new: true}
        ).populate("courseContent");

            // HW :-- use populate functiion to replace the new section id
        console.log("print course after create new section:--",updateCourse);

            if(!updateCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found with this ID'
            });}


        // return response
        return res.status(200).json({
            success : true,
            message : 'Section created successfully done',
            updatedCourse : updateCourse
        });
    }
    catch(error){
        console.log('error occuring in section creation:-  ',error);
        return res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}

// update section handler
exports.updateSection = async (req, res) =>{
    try{
        // fetch data
        const {newSecName, sectionId} = req.body;
        // validate the data
        if(!newSecName || !sectionId){
            return res.status(401).json({
                success : false,
                message : 'Enter all details '
            });
        }
        // update section 
        const updateSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName : newSecName},
            {new: true}
        );
        // return response
        return res.status(200).json({
            success : true,
            message : 'Your section updated successfully ',
            updateSection,
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'Section Updation Failed '
        });
    }
}

// Delete Section
exports.deleteSection = async (req, res) =>{
    try{
        // get id :- by request body
        const {sectionId , courseId} = req.body.sectionId;
        // get id by using prams
        // const sectionId = req.params.sectionId;
        console.log("geting section ID --->",sectionId," and course ID :--- ",courseId);
        // validate id
        if(!sectionId || sectionId.length !== 24){
            return res.status(401).json({
                success : false,
                message : 'Section ID not Recieve from user or Inccorect'
            });
        }
        const existSection = await Section.findById(sectionId);
        if(!existSection){
            return res.status(401).json({
                success : false,
                message : 'Section not Found in DB'
            });
        }
    // delete section and there references
        // delete course content 
        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent : sectionId,
            }
        })
        // Delete subsection
        await Subsection.deleteMany({_id: {$in: section.subsection}}) ;
        // delete section
        const deletedSection = await Section.findByIdAndDelete(sectionId);



        //find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();



        // return responce
        return res.status(200).json({
            success : true,
            message : 'Your section Deleted successfully ',
            data : course
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'Section not Delete, Proccess Failed '
        });
    }
    
}