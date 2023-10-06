const multer = require("multer")

const multerFiltering = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true)
    } else {
        return cbb("Only accept png, jpg, and jpeg file type")
    }
}

const upload = multer({
    fileFilter: multerFiltering
})

module.exports = upload
