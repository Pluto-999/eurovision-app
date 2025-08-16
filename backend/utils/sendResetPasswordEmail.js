const sendEmail = require("./sendEmail")

const sendResetPasswordEmail = async(username, email, token, origin) => {
    const url = `${origin}/account/reset-password?token=${token}`
    const message = `
        <h3> Hello ${username}! </h3>    
        <p><a href="${url}"> Click on this link to reset your password </a></p>
        <p> Please note: This link is only valid for 10 minutes </p>
    `

    return sendEmail(email, "Reset your password", message)
}

module.exports = sendResetPasswordEmail