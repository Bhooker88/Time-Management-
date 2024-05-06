const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = { sendEmail };