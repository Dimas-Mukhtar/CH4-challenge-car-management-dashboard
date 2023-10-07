const { Car } = require("../models")
const { Op } = require("sequelize")
const imagekit = require("../lib/imageKit")

const mainPage = async (req, res) => {
    try {
        let carsFilter = ""
        const { category, search } = req.query
        if (category) {
            const cars = await Car.findAll({
                where: {
                    category: {
                        [Op.like]: "%" + category + "%"
                    }
                }
            })
            carsFilter = cars
        } else if (search) {
            const cars = await Car.findAll({
                where: {
                    name: {
                        [Op.like]: "%" + search + "%"
                    }
                }
            })
            carsFilter = cars
        } else {
            const cars = await Car.findAll()
            carsFilter = cars
        }
        res.render("mainPage", {
            cars: carsFilter
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const createPage = (req, res) => {
    try {
        res.render("create")
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const createCar = async (req, res) => {
    const file = req.file
    try {
        const split = file.originalname.split(".")
        const extension = split[split.length - 1]

        const img = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`
        })
        await Car.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: img.url
        })
        req.session.message = {
            type: "success",
            message: "Car created successfully!"
        }
        res.redirect("/admin")
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const editePage = async (req, res) => {
    const id = req.params.id
    try {
        const car = await Car.findOne({ where: { id } })
        res.render("edit", {
            car: car
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const editeCar = async (req, res) => {
    const id = req.params.id
    try {
        let imgUrl = ""
        const file = req.file
        if (file) {
            const split = file.originalname.split(".")
            const extension = split[split.length - 1]

            const img = await imagekit.upload({
                file: file.buffer,
                fileName: `IMG-${Date.now()}.${extension}`
            })
            imgUrl = img.url
        }
        if (imgUrl) {
            await Car.update(
                {
                    image: imgUrl
                },
                { where: { id } }
            )
        } else {
            await Car.update(
                {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                },
                { where: { id } }
            )
        }
        req.session.message = {
            type: "success",
            message: "Car updated successfully!"
        }
        res.redirect("/admin")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

const deleteCar = async (req, res) => {
    const id = req.params.id
    try {
        await Car.destroy({ where: { id } })
        req.session.message = {
            type: "dark",
            message: "Car deleted successfully!"
        }
        res.redirect("/admin")
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}
module.exports = {
    mainPage,
    createPage,
    createCar,
    editePage,
    editeCar,
    deleteCar
}
