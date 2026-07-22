exports.uploadFile = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        file: {
            originalName: req.file.originalname,
            fileName: req.file.filename,
            mimeType: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        }
    });

};