const bcrypt = require("bcrypt")

const SALTROUNDS = 10

async function hashFunction (password) {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS)
    return hashedPassword
}

async function compareHash (plaintextPassword, hashedPassword) {
    const isSame = await bcrypt.compare(plaintextPassword, hashedPassword)
    return isSame
}

module.exports = { hashFunction, compareHash }