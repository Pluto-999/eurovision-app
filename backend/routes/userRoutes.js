const express = require("express")
const {
    updateUserDetails,
    homePage,
    // changeRanking,
    // changeRating,
    // getCurrentUserRankings
} = require("../controllers/userController")
const router = express.Router()

router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)
// router.patch("/changeRanking", changeRanking)
// router.patch("/changeRating", changeRating)
// router.get("/ranking/:year", getCurrentUserRankings)


module.exports = router