const express = require("express");
const { signup, login, sendotp } = require("../controllers/authController");
const { body } = require("express-validator");
const {resetPassword, resetPasswordToken} = require("../Controllers/ResetPassword")


const router = express.Router();



router.post("/signup", [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email required"),
    body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    body("otp").isLength({min:4}).withMessage("OTP is required"),
  ], signup);
  
  
  router.post("/login", [
    body("email").isEmail().withMessage("valid email required"),
    body("password").notEmpty().withMessage("password required")
  ], login);

  
  router.post("/sendotp", [
    body("email").isEmail().withMessage("valid email required"),
  ], sendotp);
  
  router.post("/reset-password-token", [
    body("email").isEmail().withMessage("email is required"),
  ], resetPasswordToken);
  
  
  router.post("/update-password", [
    body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    body("confirmPassword").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    body("token").notEmpty().withMessage("token is not received")
  ], resetPassword);
  
  module.exports = router;