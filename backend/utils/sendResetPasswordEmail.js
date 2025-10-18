const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "adamw0909@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD
        }
    })

const sendResetPasswordEmail = async(username, email, token, origin) => {
    
    const url = `${origin}/account/reset-password?token=${token}`
    const message = `
        <h3> Hello ${username}! </h3>    
        <p><a href="${url}"> Click on this link to reset your password </a></p>
        <p> Please note: This link is only valid for 10 minutes </p>
    `

    try {
        await transporter.sendMail({
            from: '"Euroscore" <adamw0909@gmail.com>',
            to: email,
            subject: "Euroscore - Reset Password",
            html: message
        })    
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendResetPasswordEmail