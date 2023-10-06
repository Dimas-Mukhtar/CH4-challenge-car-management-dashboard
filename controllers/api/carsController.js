const { Car } = require("../../models")

const createCar = async (req, res) => {
    const { name, price, category, image } = req.body
    try {
        const car = await Car.create({
            name,
            price,
            category,
            image
        })
        res.status(200).json({
            status: "Success, car created",
            data: {
                car
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const getCars = async (req, res) => {
    try {
        const cars = await Car.findAll()
        res.status(200).json({
            status: "Success, cars fetched",
            data: {
                cars
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const getCar = async (req, res) => {
    const id = req.params.id
    try {
        const car = await Car.findOne({ where: { id } })
        if (!car) {
            return res.status(404).json({
                status: `Not found!, id with ${id} are not exist`
            })
        }
        res.status(200).json({
            status: `Success, car fetched where id ${id}`,
            data: {
                car
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const updateCar = async (req, res) => {
    const { name, price, category, image } = req.body
    const id = req.params.id
    try {
        const findCar = await Car.findOne({ where: { id } })
        if (!findCar) {
            return res.status(404).json({
                status: `Not found!, id with ${id} are not exist`
            })
        }
        const car = await Car.update(
            {
                name: name,
                price: price,
                category: category,
                image: image
            },
            { where: { id } }
        )
        res.status(200).json({
            status: `Success, car updated where id ${id}`,
            data: {
                car
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

const deleteCar = async (req, res) => {
    const id = req.params.id
    try {
        const findCar = await Car.findOne({ where: { id } })
        if (!findCar) {
            return res.status(404).json({
                status: `Not found!, id with ${id} are not exist`
            })
        }
        const car = await Car.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({
            status: `Success, car deleted where id ${id}`,
            data: {
                car
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            msg: error.message
        })
    }
}

module.exports = {
    createCar,
    getCars,
    getCar,
    updateCar,
    deleteCar
}
