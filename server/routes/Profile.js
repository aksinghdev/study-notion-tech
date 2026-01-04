const express = require("express");
const router = express.Router();
const { Auth } = require("../middlewares/Auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/MyProfile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",Auth, deleteAccount);
router.put("/updateProfile", Auth, updateProfile);
router.get("/getUserDetails", Auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", Auth, getEnrolledCourses);
router.put("/updateDisplayPicture", Auth, updateDisplayPicture);

module.exports = router;
