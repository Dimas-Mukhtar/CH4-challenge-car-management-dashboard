require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 4000
const session = require("express-session")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    session({
        secret: "secret key",
        saveUninitialized: true,
        resave: false
    })
)
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/imgUploads`))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

app.use("/admin", require("./routes/adminRouter"))
// api
app.use("/api/v1/cars", require("./routes/api/carsController"))
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})
