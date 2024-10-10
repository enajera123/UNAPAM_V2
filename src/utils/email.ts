import nodemailer from "nodemailer";
export async function sendEmail(email: string, subject: string, message: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: {
            name: "UNAPAM",
            address: "unasrbpam@gmail.com",
        },
        to: email,
        subject: subject,
        html: message,
    };

    return transporter.sendMail(mailOptions);
}
