const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {
    changeRanking,
    getCurrentUserAllRankings,
    getOtherUserAllRankings,
    getCurrentUserSingleRanking,
    getOtherUserSingleRanking
} = require("../controllers/rankingController")

const router = express.Router()

router.patch("/changeRanking", authMiddleware, changeRanking)
router.get("/currentUserRankings/:year", authMiddleware, getCurrentUserAllRankings)
router.get("/otherUserRankings/:username/:year", getOtherUserAllRankings)
router.get("/currentUserRanking/:country/:year", authMiddleware, getCurrentUserSingleRanking)
router.get("/otherUserRanking/:country/:year", getOtherUserSingleRanking)


module.exports = router