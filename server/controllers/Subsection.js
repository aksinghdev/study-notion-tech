const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const {fileUploadCloudinary} = require('../utilities/FileUpload');
require("dotenv").config();

// create subsection handler
exports.createSubsection = async (req, res) =>{
    // fetch data and video file
    // validate data
    // upload video file to cloudinary to get video url
    // create subsection 
    // update Section with tis new subsection
    // return responce

    try{
        // fetch data and video file
        const {title, timeDuration, description, sectionId} = req.body;

        console.log("print fetched data in create subsection : ---",title," - ",timeDuration," - ",description," - ",sectionId," - ")

        const videoFile = req.files.videoFile;
        // validate data
        if(!title || !description ||!sectionId){
            return res.status(400).json({
                success : false,
                message : 'Please Enter All Requirement Details '
            });
        }
        // upload video file to cloudinary to get video url
        const output = await fileUploadCloudinary(videoFile, process.env.FOLDER_NAME);
        // create subsection
        const newSubSection = await Subsection.create({
            // title : title,
            title,
            timeDuration,
            description,
            videoUrl:output.secure_url,

        });
        // update Section with tis new subsection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{subsection : newSubSection._id},
            },
            {new: true}
        ).populate("subsection");
        // return responce
        return res.status(200).json({
            success : true,
            data: updatedSection,
            message : 'Your sub_Section created Successefully'
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'Sub-Section not Created, Proccess Failed '
        });
    }
}

// Update subsection Handler
exports.updateSubsection = async (req, res) =>{
    try{
        const {newtitle, newtimeDuration, newdescription, SubsecID} = req.body;
        const newvideoFile = req.files.videoContent;
        // validate data
        if(!newtitle || !newtimeDuration || !newdescription || !newvideoFile ||!SubsecID){
            return res.status(400).json({
                success : false,
                message : 'Please Enter All Required Details '
            });
        }
        // upload video file to cloudinary to get video url
        const output = await uploadFileTocloudinary(videoFile, process.env.FOLDER_NAME);
        // update subsection
        const updateSubSction = Subsection.findByIdAndUpdate(
            {SubsecID},
            {title : newtitle},
            {timeDuration : newtimeDuration},
            {description : newdescription},
            {videoUrl : output.sequreUrl}
        );
        // return response
        return res.status(200).json({
            success : true,
            updateSubSction,
            message : 'Your sub_Section Updated Successefully'
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'Sub-Section not Updated, Proccess Failed '
        });
    }
}

// Deleate subsection Handler
exports.deleteSubsection = async (req, res) =>{
    try{
        const {subSectionId, sectionId} = req.body;
        // check exitance
        const exitsSubsection = await Subsection.findById(subSectionId);
        if(!exitsSubsection){
           return res.status(404).json({
            success : false,
            message : 'Sub-Section not Found'
         }); 
        }

        // removve from section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $pull:{subsection:subSectionId}
        },
        {new: true}
    ).populate("subsection");

        const deleteSubsection = await Subsection.findByIdAndDelete(subSectionId);
        // print result
        console.log("Print updated section after delete sub section---",updatedSection);
        return res.status(200).json({
            success : true,
            updatedSection,
            message : 'Your sub_Section Deleted Successefully'
        });
    }
    catch(error){ 
        console.log(error);
        return res.status(401).json({
            success : false,
            deleteSubsection,
            message : 'Sub-Section not Deleted, Proccess Failed '
        });   
    }
}