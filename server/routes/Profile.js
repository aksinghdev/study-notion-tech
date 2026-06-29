const express = require("express");
const router = express.Router();
const { Auth } = require("../middlewares/Auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/MyProfile");

// ********************************************************************************************************
//                                           Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",Auth, deleteAccount);
// update user profile
router.put("/updateProfile", Auth, updateProfile);
// get user details
router.get("/getUserDetails", Auth, getAllUserDetails);
// get only instructor dashboard details  
router.get("/instructorDashboard", Auth, instructorDashboard);
// Get Enrolled Courses
router.get("/getEnrolledCourses", Auth, getEnrolledCourses);
// update user DP
router.put("/updateDisplayPicture", Auth, updateDisplayPicture);

module.exports = router;
