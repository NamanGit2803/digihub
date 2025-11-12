import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(categories)
    } catch (err) {
        console.error("Error fetching categories:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}