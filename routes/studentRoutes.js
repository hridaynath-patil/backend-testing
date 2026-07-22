const express = require("express");
const router = express.Router();

const {
    createStudent,
    getStudents
} = require("../controllers/studentController");

const auth = require("../middleware/authMiddleware");

// public route
router.post("/students", createStudent);

// 🔒 protected route
router.get("/students", auth, getStudents);

module.exports = router;