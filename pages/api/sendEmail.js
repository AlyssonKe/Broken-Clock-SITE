import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const {subject, name, email, message} = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    })

    try {
        const mail = await transporter.sendMail({
            from: "nodemailerformer@brokenclock.fun",
            to: "nodemailerformer@brokenclock.fun",
            replyTo: email,
            subject: `Contact form submission from ${name}`,
            html: `
                <p>Subject: ${subject} </p>
                <p>Name: ${name} </p>
                <p>Email: ${email} </p>
                <p>Message: ${message} </p>
            `
        });

        res.status(200).json({ message: "Email sent successfully", messageId: mail.messageId });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Could not sent the email."
        })
    }
};
