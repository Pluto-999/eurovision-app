const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")


const updateUserDetails = asyncWrapper(async (req, res) => {
    res.send("update user details")
})


const homePage = asyncWrapper(async (req, res) => {
    const user = await sql`
        SELECT username, email
        FROM users
        WHERE username=${req.username}
    `
    if (user.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    res.status(200).json({ success: true, user: user[0] })
})

module.exports = {
    updateUserDetails,
    homePage,
}