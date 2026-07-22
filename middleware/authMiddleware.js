const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return next(new ApiError(401, "Access denied. No token provided"));
    }

    // Expect: "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
        return next(new ApiError(401, "Invalid authorization format"));
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};