const express = require("express");
require("dotenv").config();

const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

// Routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Error Middleware
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// ====================================
// Database Connection
// ====================================

connectDB();

// ====================================
// Rate Limiter
// ====================================

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes."
    }
});

// ====================================
// Middleware
// ====================================

// Security Headers
app.use(helmet());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
}));

// Parse JSON Body
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Parse Cookies
app.use(cookieParser());

// HTTP Request Logger
app.use(morgan("dev"));

// Rate Limiting
app.use(limiter);

// Serve Uploaded Files
app.use("/uploads", express.static("uploads"));

// ====================================
// Default Routes
// ====================================

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Student API is running successfully!",
        version: "1.0.0"
    });
});

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ====================================
// API Routes
// ====================================

app.use("/api", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);

// ====================================
// 404 Route Handler
// ====================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ====================================
// Global Error Handler
// ====================================

app.use(errorHandler);

// ====================================
// Start Server
// ====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});