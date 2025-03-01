const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "48h" });
    } catch (error) {
        throw new Error("Token generation failed");
    }
};

/** 
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Create new user - password will be hashed by the pre-save hook
        user = new User({
            name,
            email,
            password, // Don't hash here, let the model handle it
            role: "user"
        });

        await user.save();

        const payload = { id: user._id, role: user.role };
        const token = generateToken(payload);

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
        console.error("Error in registration:", error);
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
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Use the matchPassword method from the User model
        const isMatch = await user.matchPassword(password);
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        const payload = { id: user._id, role: user.role };
        const token = generateToken(payload);

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
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user's profile
 * @access  Private (Protected)
 */
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;