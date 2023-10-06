const router = require("express").Router()
const carsController = require("../../controllers/api/carsController")

router.route("/").get(carsController.getCars).post(carsController.createCar)
router
    .route("/:id")
    .get(carsController.getCar)
    .put(carsController.updateCar)
    .delete(carsController.deleteCar)

module.exports = router
