const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const cloudinary = require("cloudinary").v2
const fs = require("fs")
const { attachCookie } = require("../utils/jwt")

const updateUserDetails = asyncWrapper(async (req, res) => {
    res.send("update user details")
})


const homePage = asyncWrapper(async (req, res) => {
    const user = await sql`
        SELECT username, email, profile_picture
        FROM users
        WHERE username=${req.username}
    `
    if (user.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    res.status(200).json({ success: true, user: user[0] })
})


const changeProfilePicture = asyncWrapper(async (req, res) => {

    if (!req.files) {
        return res.status(400).json({ success: false, message: "You must provide an image" })
    }

    const profilePicture = req.files.profilePicture

    if (!profilePicture.mimetype.startsWith("image")) {
        return res.status(400).json({ success: false, message: "You must provide an image" })
    }

    if (profilePicture.size > process.env.MAX_IMAGE_SIZE) {
        return res.status(400).json({ success: false, message: "Please upload an image smaller than 2MB" })
    } 

    const result = await cloudinary.uploader.upload(profilePicture.tempFilePath, {
        folder: "eurovision-app-profile-pictures"
    })

    try {
        fs.unlinkSync(profilePicture.tempFilePath)
    }
    catch (error) {
        console.error("Failed to delete temp file:", error)
    }
    
    await sql`
        UPDATE users
        SET profile_picture=${result.secure_url}
        WHERE username=${req.username}
    `

    return res.status(200).json({ success: true, profilePicture: result.secure_url })
})


const resetProfilePicture = asyncWrapper(async (req, res) => {
    const user = await sql`
        UPDATE users
        SET profile_picture=${process.env.DEFAULT_PROFILE_PICTURE}
        WHERE username=${req.username}
        RETURNING profile_picture
    `

    return res.status(200).json({ success: true, profilePicture: user[0].profile_picture })
})


const changeUsername = asyncWrapper(async (req, res) => {

    const newUsername = req.body.username

    if (!newUsername) {
        return res.status(400).json({ success: false, message: "Please provide a new username" })
    }

    if (newUsername === req.username) {
        return res.status(400).json({ success: false, message: "Please provide a new username" })
    }

    if (newUsername.length < 3 || newUsername.length > 15) {
        return res.status(400).json({ success: false, message: "Username must be between 3 and 15 characters" })
    }

    const findUsername = await sql`
        SELECT username
        FROM users
        WHERE username=${newUsername}
    `

    if (findUsername.length > 0) {
        return res.status(409).json({ success: false, message: "Sorry, this username is already in use. Please pick another" })
    }

    const user = await sql`
        UPDATE users
        SET username=${newUsername}
        WHERE username=${req.username}
        RETURNING username
    `

    const payload = { username: user[0].username }

    attachCookie(res, payload)

    res.status(200).json({ success: true, payload })
})

module.exports = {
    updateUserDetails,
    homePage,
    changeProfilePicture,
    resetProfilePicture,
    changeUsername
}