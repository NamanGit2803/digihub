import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { created_at: "desc" },
        })
        return NextResponse.json(products)
    } catch (err) {
        console.error("Error fetching products:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}