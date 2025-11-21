import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const body = await req.json();
        let updateFields = {};

        // --- 1. TEXT FIELDS (update only if provided) ---
        if (body.siteName !== undefined) updateFields.siteName = body.siteName;
        if (body.heroTitle !== undefined) updateFields.heroTitle = body.heroTitle;
        if (body.heroSubtitle !== undefined) updateFields.heroSubtitle = body.heroSubtitle;

        if (body.metaDescription !== undefined)
            updateFields.metaDescription = body.metaDescription;

        if (body.contact_email !== undefined)
            updateFields.contact_email = body.contact_email;

        if (body.contact_number !== undefined)
            updateFields.contact_number = body.contact_number;

        if (body.business_address !== undefined)
            updateFields.business_address = body.business_address;


        // --- 2. LOGO IMAGE HANDLING ---
        if (body.siteLogoUrl !== undefined) {
            // If image is base64 → upload to Cloudinary
            if (typeof body.siteLogoUrl === "string" && body.siteLogoUrl.startsWith("data:image")) {
                const upload = await cloudinary.uploader.upload(body.siteLogoUrl, {
                    folder: "siteImage",
                });
                updateFields.siteLogoUrl = upload.secure_url;
            } else {
                // already a stored URL
                updateFields.siteLogoUrl = body.siteLogoUrl;
            }
        }

        // --- 3. UPDATE DATABASE ---
        const updatedData = await prisma.siteSetting.update({
            where: { id: 1 },
            data: updateFields,
        });

        return NextResponse.json(updatedData);

    } catch (err) {
        console.error("Error updating site data:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
