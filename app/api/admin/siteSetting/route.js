import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import cloudinary from "@/lib/cloudinary"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

export async function PUT(req) {
    try {
        const body = await req.json()

        const { siteName, siteLogoUrl, heroTitle, heroSubtitle } = body

        let imageUrl = siteLogoUrl

        // Upload base64 image if changed
        if (typeof siteLogoUrl === "string" && siteLogoUrl.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(siteLogoUrl, {
                folder: "siteImage",
            })
            imageUrl = uploadResponse.secure_url
        }

        const updatedData = await prisma.siteSetting.update({
            where: { id: 1 },
            data: {
                siteName,
                siteLogoUrl : imageUrl,
                heroTitle,
                heroSubtitle,
            },
        })

        return NextResponse.json(updatedData)
    } catch (err) {
        console.error("Error updating siteData:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}