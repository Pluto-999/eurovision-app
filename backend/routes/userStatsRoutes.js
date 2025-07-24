const express = require("express")
const { 
    getAverageRating,
    getAveragePosition,
    getAveragePoints,
    getUserResults
} = require("../controllers/UserStatsController")

const router = express.Router()

router.get("/avgRating/:country/:year", getAverageRating)
router.get("/avgPosition/:country/:year", getAveragePosition)
router.get("/avgPoints/:country/:year", getAveragePoints)
router.get("/results/:year", getUserResults)

module.exports = router