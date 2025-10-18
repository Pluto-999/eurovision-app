const brevo = require("@getbrevo/brevo")

const apiInstance = new brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    )

const sendResetPasswordEmail = async(username, email, token, origin) => {
    
    const url = `${origin}/account/reset-password?token=${token}`
    const message = `
        <h3> Hello ${username}! </h3>    
        <p><a href="${url}"> Click on this link to reset your password </a></p>
        <p> Please note: This link is only valid for 10 minutes </p>
    `

    const sendEmail = new brevo.SendSmtpEmail()
    sendEmail.subject = "Euroscore - Reset Password"
    sendEmail.htmlContent = message
    sendEmail.sender = {
        name: "Euroscore",
        email: "adamw0909@gmail.com"
    }
    sendEmail.to = [{
        email: email,
        name: username
    }]

    try {
        await apiInstance.sendTransacEmail(sendEmail)    
    } 
    catch (error) {
        console.error("Error sending reset email:", error.response?.body || error.message)
    }
}

module.exports = sendResetPasswordEmail