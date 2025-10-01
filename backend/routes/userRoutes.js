const express = require("express")
const {
    updateUserDetails,
    homePage,
    changeProfilePicture,
    resetProfilePicture,
    changeUsername
} = require("../controllers/userController")
const router = express.Router()

router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)
router.patch("/changeProfilePicture", changeProfilePicture)
router.patch("/resetProfilePicture", resetProfilePicture)
router.patch("/changeUsername", changeUsername)

module.exports = router