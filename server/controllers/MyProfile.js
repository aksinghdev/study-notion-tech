const { useId } = require("react");
const Profile = require("../models/Profile");
const User = require("../models/User");
const {fileUploadCloudinary} = require("../utilities/FileUpload");

exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const userId = req.user.id;
    const {
      gender,
      dob,
      about,
      highestEducation,
      occupation,
      contactNo,
    } = req.body;
    // print data
    console.log("getting data",gender,dob,about,highestEducation,occupation,contactNo);
    // data validation
    if (
      !userId ||
      !gender ||
      !dob ||
      !about ||
      !highestEducation ||
      !contactNo
    ) {
      return res.status(401).json({
        success: false,
        message: "All details are mendatory ",
      });
    }
    // find user details to get user profile ID
    console.log("update profile controller geting userID -- >", userId);
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    console.log("user details:--", userDetails);
    console.log("user profileId:--", profileId);
    console.log("user profileDetails:--", profileDetails);
    // update profile details
    // profileDetails.gender = gender;
    // profileDetails.dob = dob;
    // profileDetails.about = about;
    // profileDetails.highestEducation = highestEducation;
    // profileDetails.occupation = occupation;
    // profileDetails.contactNo = contactNo;

    // await profileDetails.save();

    // find user Profile
    const user = await Profile.findByIdAndUpdate(
        profileId ,
      {
        gender,
        dob,
        about,
        highestEducation,
        occupation,
        contactNo,
      },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Your Profile updation Proccess success",
      // profileDetails,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Your Profile updation Proccess Failed !! ",
    });
  }
};
// how to schedule this task for some times
//  what is cron job
// delete Account Handler
exports.deleteAccount = async (req, res) => {
  try {
    // fetch id
    // const id = req.body.id;
    const id = req.user.id;
    console.log("getting user id----",id);
    // validation
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "This user not register here ",
      });
    }
    // get and delete user profile
    const userProfileId = userData.additionalDetails;
    const deleteUserProfileData = await Profile.findByIdAndDelete(userProfileId);
    // HW : Is the need to delete also the enrolled courses

    // delelte account
    const DeleteAccount = await User.findByIdAndDelete({ _id: id });

    // return response
    return res.status(201).json({
      success: true,
      message: "Your Account Deleted succefully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Your Account Delete Proccess Failed !! ",
    });
  }
};

// get all user
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//  update DP of user
exports.updateDisplayPicture = async (req, res) => {
  try {

    // console.log("FILES:", req.files);
    // console.log("BODY:", req.body);
    // console.log("USER:", req.user);


    const imageFile = req.files.displayPicture;
    const userId = req.user.id;
    console.log("get user id for update DP--",userId);
    const image = await fileUploadCloudinary(
      imageFile,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { userImage: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log("Error update display picture controller");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
