// const express = require("express");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const protect = require("../middleware/authMiddleware");


// const router = express.Router();

// // @route POST /api/users/register
// // @desc Register a new user
// // @access Public

// router.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Registration logic

//         let user = await User.findOne({ email });

//         if (user) return res.status(400).json({message: "User already exists"});

//         user = new User({ name, email, password});
//         await user.save();

//         // res.status(201).json({
//         //     user: {
//         //         _id: user._id,
//         //         name: user.name,
//         //         email: user.email,
//         //         role: user.role,  
//         //     }
//         // })

//         // Create JWT Payload
//         const payload = {user: {id: user._id, role: user.role} };


//         // Sign and return the token along with user data 
//         jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "40h"}, (err, token) => {
//             if (err) throw err;
          
//             //Send the user and token in response

//             res.status(201).json({
//                 user: {
//                     _id: user._id,
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,

//                 },
//                 token,
//             });

//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server error");
//     }
// }
// );

// // @route POST /api/users/login 
// // @desc Authenticate user 
// // @access Public

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try { 
//         // Find the user by email
//         let user = await User.findOne({email});

//         if (!user) return res.status(400).json({ message: "Invalid Credentials"});
//         const isMatch = await user.matchPassword(password);

//         if (!isMatch)
//             return res.status(400).json({ message: "Invalid Credentials"});

//         // Create JWT Payload
//         const payload = {user: {id: user._id, role: user.role} };


//         // Sign and return the token along with user data 
//         jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "40h"}, (err, token) => {
//             if (err) throw err;
          
//             //Send the user and token in response

//             res.json({
//                 user: {
//                     _id: user._id,
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,

//                 },
//                 token,
//             });

//         });

//     }catch (error) {
//         console.log(error);
//         res.status(500).send("Server error");

//     }
// });


// // @route GET /api/users/profile
// // @desc Get logged-in user's profile (protected Route)
// //@access Private

// router.get("/profile", protect,async (req, res) => {
//     res.json(req.user);
// })
 
// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword, // Store hashed password
        });

        await user.save();

        // Create JWT Token
        const payload = { user: { id: user._id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        // Send response with user data and token
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & return token
 * @access  Public
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Create JWT Token
        const payload = { user: { id: user._id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        // Send response with user data and token
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user's profile
 * @access  Private (Protected)
 */
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
