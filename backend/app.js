const express = require("express")

const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")

const path = require("path")

dotenv.config()

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

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
const searchRoutes = require("./routes/searchRoutes")

const authMiddleware = require("./middleware/authMiddleware")

const { app, server } = require("./socket")

const PORT = process.env.PORT || 3000

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "https:", "https://upload.wikimedia.org", "https://res.cloudinary.com"],
        },
    },
}))
app.use(morgan("dev"))
if (process.env.NODE_ENV === "production") {
    // no need for CORS as deployed on same origin
}
else {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))
}
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET_KEY))
app.use(fileUpload({ useTempFiles: true }))

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
app.use("/api/search", searchRoutes)

app.use(errorHandler)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} ...`)
})