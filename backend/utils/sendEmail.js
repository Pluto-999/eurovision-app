const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    })

const sendEmail = async(to, subject, html) => {
    const info = transporter.sendMail({
        from: '"Euroscore" <no-reply@euroscore.app>',
        to: to,
        subject: subject,
        html: html
    })

    console.log("Message sent:", info.messageId);

}

module.exports = sendEmail