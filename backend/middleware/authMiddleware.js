const { verifyToken } = require("../utils/jwt")

const authMiddleware = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        return res.status(401).json({ success: false, message: "sorry, you are unauthorized to access this route" })
    }

    try {
        const payload = verifyToken(token)
        req.username = payload.username
        next()
    }
    catch {
        return res.status(401).json({ success: false, message: "sorry, you are unauthorized to access this route" })
    }
    
}


module.exports = authMiddleware