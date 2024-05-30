import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { ParameterId } from "@/types/api";

export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const userData = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                id: fetchedId
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        const passwordMatch = await bcrypt.compare(userData.currentPassword, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
        }
        const newPasswordHash = await bcrypt.hash(userData.newPassword, 10); 

        const updatedUser = await prisma.user.update({
            where: {
                id:fetchedId 
            },
            data: {
                password: newPasswordHash
            }
        });
        const { password, ...userDatas } =  updatedUser as {
            password: string;
        }
        return NextResponse.json(userDatas, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}