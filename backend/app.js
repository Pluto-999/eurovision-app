const express = require("express")

const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const errorHandler = require("./middleware/errorHandler")

const countriesRoutes = require("./routes/countriesRoutes") 
const entriesRoutes = require("./routes/entriesRoutes")
const resultsRoutes = require("./routes/resultsRoutes")
const authRoutes = require("./routes/authRoutes")

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(morgan("dev"))
app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("HELLO WORLD!")
})

app.use("/api/countries", countriesRoutes)
app.use("/api/entries", entriesRoutes)
app.use("/api/results", resultsRoutes)
app.use("/api/auth", authRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} ...`)
})