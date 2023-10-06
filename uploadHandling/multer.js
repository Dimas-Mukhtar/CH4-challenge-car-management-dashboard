const multer = require("multer")
const MB = 2
const maxSize = MB * 1024 * 1024

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./imgUploads")
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }
}).single("image")

module.exports = upload
