const express = require("express")
const {
    updateUserDetails,
    homePage,
    changeProfilePicture
} = require("../controllers/userController")
const router = express.Router()

router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)
router.patch("/changeProfilePicture", changeProfilePicture)


module.exports = router