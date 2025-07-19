const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {
    changeRating,
    getCurrentUserRating,
    getOtherUserRating
} = require("../controllers/ratingController")

const router = express.Router()

router.patch("/changeRating", authMiddleware, changeRating)
router.get("/currentUserRating/:country/:year", authMiddleware, getCurrentUserRating)
router.get("/otherUserRating/:username", getOtherUserRating)

module.exports = router