const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ================= REGISTER =================

exports.register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });

});

// ================= LOGIN =================

exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });

});