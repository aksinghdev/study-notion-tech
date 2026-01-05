// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers 

// Course Controllers Import
const {
  createCourse,
  getCourseDetails,
  showAllCourses,
  updateCourse,
} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  creatSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/Subsection");

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// Importing Middlewares
const {
  Auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/Auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", Auth, isInstructor, createCourse);
// update a existing course
router.post("/editCourse", Auth, isInstructor, updateCourse);
//Add a Section to a Course
router.post("/addSection", Auth, isInstructor, creatSection);
// Update a Section
router.post("/updateSection", Auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", Auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", Auth, isInstructor, updateSubsection);
// Delete Sub Section
router.post("/deleteSubSection", Auth, isInstructor, deleteSubsection);
// Add a Sub Section to a Section
router.post("/addSubSection", Auth, isInstructor, createSubsection);
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory", Auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", Auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
