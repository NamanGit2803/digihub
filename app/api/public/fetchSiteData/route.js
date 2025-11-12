import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

//  GET ALL PRODUCTS
export async function GET() {
    try {
        const siteData = await prisma.siteSetting.findUnique({
            where: { id: 1 },
        })
        return NextResponse.json(siteData)
    } catch (err) {
        console.error("Error fetching data:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}