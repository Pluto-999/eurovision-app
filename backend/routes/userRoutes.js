const express = require("express")
const {
    updateUserDetails,
    homePage,
    changeProfilePicture,
    resetProfilePicture
} = require("../controllers/userController")
const router = express.Router()

router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)
router.patch("/changeProfilePicture", changeProfilePicture)
router.patch("/resetProfilePicture", resetProfilePicture)

module.exports = router