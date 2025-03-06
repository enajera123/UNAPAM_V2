import prisma from "@/lib/prisma";
import { getPasswordResetEmail } from "./htmlTemplate";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";


function generatePassword(length = 8) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; ++i) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    return password;
}

export async function PUT(req: NextRequest) {
    const { identification } = await req.json();
    try {
        console.log(identification)
        const user = await prisma.user.findFirst({
            where: {
                identification: identification
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const newPassword = generatePassword();
        const updatedUser = await prisma.user.update({
            where: {
                identification: identification
            },
            data: {
                password: newPassword,
                isPasswordChanged: 'Yes'
            }
        });
        try {
            const emailSubject = "Recuperación de contraseña";
            const emailMessage = getPasswordResetEmail(newPassword);
            await sendEmail(user.email, emailSubject, emailMessage);
        } catch (error) {
            console.error("Error while sending email:", error);
            return NextResponse.json({ error: "Error while sending email" }, { status: 500 });
        }
        console.log("email sent succesfully");
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}