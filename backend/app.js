const express = require("express")

const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

const errorHandler = require("./middleware/errorHandler")

const countriesRoutes = require("./routes/countriesRoutes") 
const entriesRoutes = require("./routes/entriesRoutes")
const resultsRoutes = require("./routes/resultsRoutes")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

const authMiddleware = require("./middleware/authMiddleware")

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(morgan("dev"))
app.use(cors())

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET_KEY))

app.get("/", (req, res) => {
    console.log('Cookies: ', req.signedCookies)

    res.send("HOME PAGE")
})

app.use("/api/countries", countriesRoutes)
app.use("/api/entries", entriesRoutes)
app.use("/api/results", resultsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", authMiddleware, userRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} ...`)
})