const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {
    changeRanking,
    getCurrentUserAllRankings,
    getOtherUserAllRankings
} = require("../controllers/rankingController")

const router = express.Router()

router.patch("/changeRanking", authMiddleware, changeRanking)
router.get("/currentUserRankings/:year", authMiddleware, getCurrentUserAllRankings)
router.get("/otherUserRankings/:username/:year", authMiddleware, getOtherUserAllRankings)


module.exports = router