const router = require("express").Router()
const {
    mainPage,
    createPage,
    createCar,
    editePage,
    editeCar,
    deleteCar
} = require("../controllers/adminController")

const uploadHandling = require("../uploadHandling/multer")

// get page
router.route("/").get(mainPage)
router.route("/create").get(createPage)
router.route("/edite/:id").get(editePage)

// action
router.route("/create-action").post(uploadHandling, createCar)
router.route("/edite-action/:id").post(uploadHandling, editeCar)
router.route("/delete-action/:id").post(deleteCar)

module.exports = router
