const express = require("express")
const {
    updateUserDetails,
    getAllUsers,
    homePage,
    changeRanking,
    changeRating
} = require("../controllers/userController")
const router = express.Router()

router.get("/allUsers", getAllUsers)
router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)
router.patch("/changeRanking", changeRanking)
router.patch("/changeRating", changeRating)


module.exports = router