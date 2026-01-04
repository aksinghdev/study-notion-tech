
const Section = require("../models/Section");
const Course = require('../models/Course');


exports.creatSection = async (req , res ) =>{
    try{
        // fetch data 
        const {sectionName, courseID} = req.body;
        // validate the data
        if(!sectionName || !courseID){
            return res.status(401).json({
                success : false,
                message : 'Enter all details '
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course with this new section
        const updateCourse = await Course.findByIdAndUpdate(
            courseID,
            {
                $push:{courseContent: newSection._id},
            },
            {new: true}
        );
        // HW :-- use populate functiion to replace the new section id
        console.log(updateCourse);
        // return response
        return res.status(200).json({
            success : true,
            message : 'Section created successfully done'
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
        const sectionID = req.body.sectionID;
        // get id by using prams
        // const sectionID = req.params.sectionID;
        console.log("geting section ID --->",sectionID);
        // validate id
        if(!sectionID || sectionID.length !== 24){
            return res.status(401).json({
                success : false,
                message : 'Section not Found or Inccorect'
            });
        }
        // delete section
        // kya is section ko course se bhi delete krna padega???
        const deletedSection = await Section.findByIdAndDelete(sectionID);
        // return responce
        return res.status(200).json({
            success : true,
            message : 'Your section Deleted successfully ',
            deletedSection
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