const mailer = require('nodemailer')
const config = require('../config')

const sendEmail = async ({ from, to, subject, text, html }) => {
    const transport = mailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_POST,
        secure: false,
        auth: {
            user: config.MAIL_USER,
            pass: config.MAIL_PASSWORD
        }
    })

    const info = await transport.sendMail({
        from: `imageShare <${from}>`, to, subject, text, html
    })
}

module.exports = sendEmail