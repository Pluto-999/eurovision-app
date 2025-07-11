const express = require("express")
const {
    getCurrentUser,
    getUser, 
    updateUserDetails,
    getAllUsers,
} = require("../controllers/userController")
const router = express.Router()

router.get("/allUsers", getAllUsers)
router.get("/currentUser", getCurrentUser)
router.patch("/updateUser", updateUserDetails)
router.get("/:username", getUser)


module.exports = router