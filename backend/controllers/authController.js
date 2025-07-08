const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const { hashFunction, compareHash } = require("../utils/hashPassword")

const register = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "all fields are required" })
    }

    // LOOKING FOR DUPLICATE USERNAME OR EMAIL
    const findUsername = await sql`
        SELECT username
        FROM users
        WHERE username=${username}
    `

    const findEmail = await sql`
        SELECT email
        FROM users
        WHERE email=${email}
    `

    if (findUsername.length > 0) {
        return res.status(409).json({ success: false, message: "Sorry, this username is already associated to an account"} )
    }

    if (findEmail.length > 0) {
        return res.status(409).json({ success: false, message: "Sorry, this email is already associated to an account"} )
    }

    // END OF LOOKING FOR DUPLICATE USERNAME OR EMAIL

    const hashedPassword = await hashFunction(password)

    const user = await sql`
        INSERT INTO users(username, email, password)
        VALUES (${username}, ${email}, ${hashedPassword})
        RETURNING *
    `

    res.status(201).json({ success: true, user: user[0] })

})

const login = asyncWrapper(async (req, res) => {
    res.send("Login User")
})

const logout = asyncWrapper(async (req, res) => {
    res.send("Logout User")
})

module.exports = {
    register,
    login,
    logout
}