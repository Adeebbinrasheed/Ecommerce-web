const express = require("express");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const User = require("../models/User");
const sendToken = require("../utils/jwtToken");


//signup
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({message:'user already exists'})
    }

    const user = {
      name,
      email,
      password,
    };

    const otp = Math.floor(Math.random() * 1000000);
    const activationToken = jwt.sign(
      { user, otp },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );
    await sendMail({
      email: email,
      subject: "user authentication",
      message: `please verify your account using otp your otp is ${otp}`,
    });

    res
      .status(201)
      .json({ message: "otp send to your email", activationToken });
      console.log(activationToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//verification
const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;
    console.log(activationToken);
    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    if (!verify) {
      res.status(401).json({ message: "otp expired" });
    }
    if (verify.otp !== otp) {
      res.status(401).json({ message: "wrong otp" });
    }

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
    });
    res.status(200).json({ message: "user registered" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).json({ message: "please provide all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "invalid credentials1" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "invalid credentials" });
    }
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//profile
const profileUser=async(req,res)=>{
  try {
    const user=await User.findById(req.user._id)
    res.json({user})
  } catch (error) {
    res.status(400).json({message:error.message})
    
  }
}

module.exports = { register, verifyUser, loginUser ,profileUser};
