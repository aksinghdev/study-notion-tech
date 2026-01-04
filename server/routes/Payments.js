// Import the required modules
const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature } = require("../controllers/Payments");
const {
  Auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/Auth");
router.post("/capturePayment", Auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
