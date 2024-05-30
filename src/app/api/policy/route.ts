import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const policys = await prisma.policy.findMany({});
        return NextResponse.json(policys, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse){
    try {

       const policy = await req.json();

        const newpolicy = await prisma.policy.create({
            data:{
                ...policy
            }
        });
       return NextResponse.json(newpolicy, {status: 201})
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}