import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { publicIpv4 } from "public-ip";
import { getPasswordResetEmail } from "./htmlTemplate";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";


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
            const emailSubject = "Recuperación de contraseña";
            const emailMessage = getPasswordResetEmail(newPassword, user.id, await getBaseURL());
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
const getBaseURL = async () => {
    const ip = await publicIpv4()
    return `http://${ip}/changePassword`
}