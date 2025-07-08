const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")

dotenv.config()

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_LIFETIME })
    return token
}

function attachCookie(res, payload) {
    const token = generateToken(payload)
    
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 86400000), // expires in 1 day
        signed: true
        // also set secure to true so as only to be used with https ???
    })
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { generateToken, verifyToken, attachCookie }