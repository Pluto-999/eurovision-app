const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
} = require("../controllers/authController")
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", authMiddleware, logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

module.exports = router