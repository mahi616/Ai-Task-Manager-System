const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = async(req,res) => {
    const {name, email, password} = req.body;

    try {
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(409).json({
                message: "Emails already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password:hashPassword,
        })
        await user.save();

        res.status(201).json({
            message:"User Registration Successfull",
            user: {
                id:user._id,
                name:user.name,
                email:user.email,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

const loginUser = async (req,res) => {
    const { email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "Please enter valid email"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message:"Please enter valid password"});

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        )

        res.status(200).json({
            message: "Login Successfull",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
            token,
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}



module.exports = { registerUser, loginUser}