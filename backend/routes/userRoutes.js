const express = require("express")
const {
    updateUserDetails,
    homePage,
} = require("../controllers/userController")
const router = express.Router()

router.get("/home", homePage)
router.patch("/updateUser", updateUserDetails)


module.exports = router