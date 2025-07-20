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
const userStatsRoutes = require("./routes/userStatsRoutes")
const friendsRoutes = require("./routes/friendsRoutes")
const messagesRoutes = require("./routes/messagesRoutes")
const ratingRoutes = require("./routes/ratingRoutes")
const rankingRoutes = require("./routes/rankingRoutes")

const authMiddleware = require("./middleware/authMiddleware")

dotenv.config()

const { app, server } = require("./socket")

const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

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
app.use("/api/userstats", userStatsRoutes)
app.use("/api/friends", authMiddleware, friendsRoutes)
app.use("/api/messages", authMiddleware, messagesRoutes)
app.use("/api/rating", ratingRoutes)
app.use("/api/ranking", rankingRoutes)

app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} ...`)
})