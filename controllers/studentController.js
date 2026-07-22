const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ================= CREATE =================

exports.createStudent = asyncHandler(async (req, res) => {

    const student = await Student.create(req.body);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: student
    });

});

// ================= GET ALL =================

exports.getStudents = asyncHandler(async (req, res) => {

    const students = await Student.find();

    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });

});

// ================= GET BY ID =================

exports.getStudentById = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.params.id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    res.status(200).json({
        success: true,
        data: student
    });

});

// ================= UPDATE =================

exports.updateStudent = asyncHandler(async (req, res) => {

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student
    });

});

// ================= DELETE =================

exports.deleteStudent = asyncHandler(async (req, res) => {

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });

});