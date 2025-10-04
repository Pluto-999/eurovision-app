const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const { hashFunction, compareHash } = require("../utils/hashPassword")
const { attachCookie } = require("../utils/jwt")
const createDeafultRankings = require("../utils/createDefaultRankings")
const hashToken = require("../utils/hashPasswordToken")
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail")
const crypto = require("crypto")

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
        return res.status(409).json({ success: false, message: "Sorry, this username is already in use. Please pick another" })
    }

    if (findEmail.length > 0) {
        return res.status(409).json({ success: false, message: "Sorry, this email is already associated to an account" })
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

    const response = {
        username: user[0].username,
        email: user[0].email,
        profile_picture: user[0].profile_picture
    }

    res.status(201).json({ success: true, user: response })

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

    const response = {
        username: user[0].username,
        email: user[0].email,
        profile_picture: user[0].profile_picture
    }

    res.status(200).json({ success: true, user: response })
})

const logout = asyncWrapper(async (req, res) => {
    // removing the cookie
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ success: true, message: "Logged out successfully" })
})

const forgotPassword = asyncWrapper(async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ success: false, message: "Please provide a valid email" })
    }

    const user = await sql`
        SELECT *
        FROM users
        WHERE email=${email}
    `

    // if the email is valid we want to allow the user to reset their password
    if (user.length > 0) {
        
        const passwordToken = crypto.randomBytes(32).toString("hex")

        const expiration = 1000 * 60 * 10 // 10 minute expiration for passwordToken
        const passwordTokenExpiration = new Date(Date.now() + expiration)

        await sql`
            UPDATE users
            SET password_token=${hashToken(passwordToken)}, password_token_expiration=${passwordTokenExpiration}
            WHERE username=${user[0].username}
        `

        // send email
        try {
            await sendResetPasswordEmail(user[0].username, user[0].email, passwordToken, process.env.FRONTEND_URL)
        }
        catch (error) {
            console.log("Error sending forgot password email: ", error)
        }
    }

    res.status(200).json({ success: true, message: "Please check your email for a link to reset your password" })
})

const resetPassword = async (req, res) => {
    const { token, password } = req.body

    if (!token || !password) {
        return res.status(400).json({ success: false, message: "All fields are required, including a valid token and new password. Please try again with the link given via email" })
    }

    const user = await sql`
        SELECT *
        FROM users
        WHERE password_token=${hashToken(token)}
    `

    if (user.length === 0) {
        return res.status(400).json({ success: false, message: "This link is either invalid or has expired. Please try again" })
    }

    const samePassword = await compareHash(password, user[0].password)

    if (samePassword) {
        return res.status(400).json({ success: false, message: "Please ensure you pick a new password" })
    }

    const currentTime = new Date()

    if (!user[0].password_token || 
        !user[0].password_token_expiration ||
        user[0].password_token != hashToken(token) || 
        currentTime > new Date(user[0].password_token_expiration)
    )  {
        return res.status(400).json({ success: false, message: "This link is either invalid or has expired. Please try again" })
    }

    // now we can actually update the password
    const hashedPassword = await hashFunction(password)
    
    await sql`
        UPDATE users
        SET password=${hashedPassword}, password_token=${null}, password_token_expiration=${null}
        WHERE username=${user[0].username}
    `
    
    res.status(200).json({ success: true, message: "Password has been successfully reset. You can now login with your new password" })
    
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
}