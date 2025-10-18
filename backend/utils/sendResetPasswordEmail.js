const { Resend } = require("resend")

const sendResetPasswordEmail = async(username, email, token, origin) => {
    
    const resend = new Resend(process.env.RESEND_API_KEY)

    const url = `${origin}/account/reset-password?token=${token}`
    const message = `
        <h3> Hello ${username}! </h3>    
        <p><a href="${url}"> Click on this link to reset your password </a></p>
        <p> Please note: This link is only valid for 10 minutes </p>
    `

    try {
        resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Euroscore - Reset your password",
            html: message
        })    
    } catch (error) {
        console.log(error)
    }
    
    
}

module.exports = sendResetPasswordEmail