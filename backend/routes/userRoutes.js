const express = require("express")
const {
    getCurrentUser,
    getUser, 
    updateUserDetails,
    getAllUsers,
    homePage
} = require("../controllers/userController")
const router = express.Router()

router.get("/allUsers", getAllUsers)
router.get("/currentUser", getCurrentUser)
router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)
router.get("/:username", getUser)


module.exports = router