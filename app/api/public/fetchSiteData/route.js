export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

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