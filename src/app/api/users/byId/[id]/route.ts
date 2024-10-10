import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { ParameterId } from "@/types/api";
import nodemailer from "nodemailer";

async function sendEmail(subject: string, message: string) {
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
        to: "estebannajera42@gmail.com",
        subject: subject,
        html: message,
    };

    return transporter.sendMail(mailOptions);
}

export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const { currentPassword, newPassword } = await req.json();
        await sendEmail(`Usuario ${fetchedId} Cambio de contraseña`, `Su contraseña ha sido cambiada a ${newPassword}`);
        const user = await prisma.user.findUnique({
            where: {
                id: fetchedId
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        const updatedUser = await prisma.user.update({
            where: {
                id: fetchedId
            },
            data: {
                password: newPasswordHash,
                isPasswordChanged: 'n'
            }
        });
        const { password, ...userDatas } = updatedUser as {
            password: string;
        }
        return NextResponse.json(userDatas, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}