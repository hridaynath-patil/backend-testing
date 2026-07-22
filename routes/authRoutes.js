const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const validate = require("../middleware/validationMiddleware");

const {
    register,
    login
} = require("../controllers/authController");

// REGISTER

router.post(
    "/register",

    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],

    validate,

    register
);

// LOGIN

router.post(
    "/login",

    [
        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],

    validate,

    login
);

module.exports = router;