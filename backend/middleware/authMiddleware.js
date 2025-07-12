const { verifyToken } = require("../utils/jwt")

const authMiddleware = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        return res.status(401).json({ success: false, message: "Sorry, you are unauthorized to access this route. Try logging in again or register for an account if you do not have one." })
    }

    try {
        const payload = verifyToken(token)
        req.username = payload.username
        next()
    }
    catch {
        return res.status(401).json({ success: false, message: "Sorry, you are unauthorized to access this route. Try logging in again or register for an account if you do not have one." })
    }
    
}


module.exports = authMiddleware