const crypto = require("crypto")

const hashToken = (string) => {
    return crypto.createHash("sha256").update(string).digest("hex")
}

module.exports = hashToken