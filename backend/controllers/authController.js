const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const { hashFunction, compareHash } = require("../utils/hashPassword")
const { verifyToken, attachCookie } = require("../utils/jwt")
const createDeafultRankings = require("../utils/createDefaultRankings")

const register = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }

    if (username.length < 3 || username.length > 15) {
        return res.status(400).json({ success: false, message: "Username must be between 3 and 15 characters" })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "The email you provided is not a valid format" })
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


    // HASHING PASSWORD AND REGISTERING USER

    const hashedPassword = await hashFunction(password)

    const user = await sql`
        INSERT INTO users(username, email, password)
        VALUES (${username}, ${email}, ${hashedPassword})
        RETURNING *
    `

    // GENERATING JWT/COOKIE AND SENDING BACK RESPONSE

    // just want what we are sending to the frontend (payload) to be the username (primary key of users table)
    const payload = {username: username}
    
    attachCookie(res, payload) // attach cookie to response (res)

    // add all entries as unranked and associated to the new user being registered
    createDeafultRankings(username)

    res.status(201).json({ success: true, username: user[0].username })

})

const login = asyncWrapper(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Both username and password are required to login" })
    }

    const user = await sql`
        SELECT *
        FROM users
        WHERE username=${username}
    `

    if (user.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    const storedPassword = user[0].password

    const samePassword = await compareHash(password, storedPassword) 

    if (!samePassword) {
        return res.status(401).json({ success: false, message: "Your password is incorrect, please try again" })
    }

    const payload = {username: username}

    attachCookie(res, payload)

    res.status(200).json({ success: true, username: user[0].username })
})

const logout = asyncWrapper(async (req, res) => {
    // removing the cookie
    res.cookie("token", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now())
    })

    res.status(200).json({ success: true, message: "Logged out successfully" })
})

module.exports = {
    register,
    login,
    logout
}