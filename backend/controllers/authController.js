const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET,{expiresIn: "7d"});

};

// @des Register a new user 
//@route POST /api/auth/register
// @access public 

const registerUser = async(req, res) =>{

};

// @des login user 
//@route POST /api/auth/login
// @access public

const loginUser = async(req, res) =>{

};

// @des get user profile
//@route POST /api/auth/profile
// @access private(Require JWT)
const getUserProfile = async(req, res) =>{

};

module.exports = {registerUser, loginUser, getUserProfile};



