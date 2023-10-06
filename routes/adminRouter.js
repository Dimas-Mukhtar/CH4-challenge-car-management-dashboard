const router = require("express").Router()
const {
    mainPage,
    createPage,
    createCar,
    editePage,
    editeCar,
    deleteCar
} = require("../controllers/adminController")

const upload = require("../middlewares/uploader")

// get page
router.route("/").get(mainPage)
router.route("/create").get(createPage)
router.route("/edite/:id").get(editePage)

// action
router.route("/create-action").post(upload.single("image"), createCar)
router.route("/edite-action/:id").post(upload.single("image"), editeCar)
router.route("/delete-action/:id").post(deleteCar)

module.exports = router
