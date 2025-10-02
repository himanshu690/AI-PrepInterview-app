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
    try{
        const {name, email, password, profileImageUrl} = req.body;
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({message: "User already exists"});

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }catch(error){
        res.status(500).json({message: "Server error", error:error.message})

    }
};

// @des login user 
//@route POST /api/auth/login
// @access public

const loginUser = async(req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }
        //return user data with jwt
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({message: "Server error", error:error.message}); 
    }
};

// @des get user profile
//@route POST /api/auth/profile
// @access private(Require JWT)
const getUserProfile = async(req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } catch (error) {
        res.state(500).json({message: "Server error", error:error.message})
        
    }
};

module.exports = {registerUser, loginUser, getUserProfile};



