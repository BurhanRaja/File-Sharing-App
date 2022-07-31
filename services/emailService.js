const mailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async ({ from, to, subject, text, html }) => {
    const transport = mailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const info = await transport.sendMail({
        from: `imageShare <${from}>`, to, subject, text, html
    })
}

module.exports = sendEmail