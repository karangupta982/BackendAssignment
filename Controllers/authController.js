const bcrypt = require("bcryptjs");
const User = require("../Models/userSchema");
const OTP = require("../Models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../Util/MailSender");
require("dotenv").config();
const { validationResult } = require("express-validator");


exports.signup = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
        name,
        email,
        password,
        otp 
    } = req.body;

    try{
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exist, Please Login to continue.",
            })
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (!response.length) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid",
        });
        } else if (otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        
        res.status(201).json({
            success:true,
            message:"User registered Successfully."
        });

    }
    catch (err) {
        console.log("error",err)
        res.status(500).json({
            success:false,
            message: "Signup failed. User cannot be registered, please try again." 
        });
      }

}

exports.login = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User is not registered. Please signup to continue."
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).json({
                success: false,
                message: "Invalid password."
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
    

        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            message:"User Login successfull."
        })

        

    }
    catch(err){
        console.log("error",err)
        res.status(500).json({
            message:"login failed. Please try again."
        })
    }
}



exports.sendotp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
      const { email } = req.body;
        console.log("email extracted from req.body",email)
        const checkUserPresent = await User.findOne({ email });
        console.log("email checked from database")
  
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: `User is Already Registered`,
        });
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const result = await OTP.findOne({ otp: otp });
      console.log("Result is Generate OTP Func");
      console.log("OTP", otp);
      console.log("Result", result);
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
      }
      const otpPayload = { email, otp };

      const otpBody = await OTP.create(otpPayload);


      console.log("OTP Body", otpBody);
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  };



