const express = require("express");
const router = express.Router();

const multer = require("multer");
const { uploadFile } = require("../controllers/uploadController");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({
    storage: storage
});

router.post(
    "/upload",
    upload.single("image"),
    uploadFile
);

module.exports = router;