const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")


const updateUserDetails = asyncWrapper(async (req, res) => {
    res.send("update user details")
})

const getCurrentUser = asyncWrapper(async (req, res) => {
    res.status(200).json({ success: true, username: req.username})
})

const getUser = asyncWrapper(async (req, res) => {
    const username = req.params.username

    const user = await sql`
        SELECT username, email
        FROM users
        WHERE username=${username}
    `

    if (user.length === 0) {
        return res.status(401).json({ success: false, message: "no user exists with this username" })
    }

    res.status(200).json({ success: true, user: user })
})

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await sql`
        SELECT username, email
        FROM users
    `
    if (users.length === 0) {
        return res.status(401).json({ success: false, message: "no users exist" })
    }

    res.status(200).json({ success: true, users: users })
})

module.exports = {
    getCurrentUser, 
    updateUserDetails,
    getUser,
    getAllUsers,
}