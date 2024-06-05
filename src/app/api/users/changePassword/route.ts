import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import { getPasswordResetEmail } from "./htmlTemplate";
import { NextRequest, NextResponse } from "next/server";

async function sendEmail(email: string, subject: string, message: string) {
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

function generatePassword(length = 10) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; ++i) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    return password;
}

export async function PUT(req: NextRequest) {
    const { identificacion } = await req.json();
    try {
        const fetchedIdentification = identificacion.toString();

        const user = await prisma.user.findFirst({
            where: {
                identification: fetchedIdentification
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newPassword = generatePassword();

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await prisma.user.update({
            where: {
                identification: fetchedIdentification
            },
            data: {
                password: hashedPassword,
                isPasswordChanged: 's'
            }
        });

        try {
            const baseUrl = req.nextUrl.clone().origin + "/changePassword";
            const emailSubject = "Recuperación de contraseña";
            const emailMessage = getPasswordResetEmail(newPassword, user.id, baseUrl);
            await sendEmail(user.email, emailSubject, emailMessage);
        } catch (error) {
            console.error("Error while sending email:", error);
            return NextResponse.json({ error: "Error while sending email" }, { status: 500 });
        }
        console.log("email sent succesfully");
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}