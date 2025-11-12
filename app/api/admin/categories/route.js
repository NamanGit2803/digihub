import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import cloudinary from "@/lib/cloudinary"
import { nanoid } from "nanoid"
import slugify from "slugify"

const prisma = new PrismaClient()

//  CREATE CATEGORY (POST)
export async function POST(req) {
    try {
        const body = await req.json()
        const { title, image } = body

        let imageUrl = image

        // Upload base64 image to Cloudinary
        if (typeof image === "string" && image.startsWith("data:image")) {

            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "categories",
            })
            imageUrl = uploadResponse.secure_url
        }

        const slug = slugify(title, { lower: true, strict: true })
        const customId = `cat_${nanoid(8)}`

        const newCategory = await prisma.category.create({
            data: {
                id: customId,
                name: title,
                image: imageUrl,
                slug
            },
        })

        return NextResponse.json(newCategory, { status: 201 })
    } catch (err) {
        console.error("Error creating category:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}


// GET ALL CATEGORIES
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


//  DELETE CATEGORY
export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        const category = await prisma.category.findUnique({ where: { id: id } });
        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        await prisma.category.delete({ where: { id: id } });

        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Error deleting category:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


// UPDATE PRODUCT (PUT)
export async function PUT(req) {
    try {
        const body = await req.json()

        const { id, title, image, slug} = body

        if (!id) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
        }

        const existingProduct = await prisma.category.findUnique({ where: { id: id } })
        if (!existingProduct) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 })
        }

        let imageUrl = image

        // Upload base64 image if changed
        if (typeof image === "string" && image.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "categories",
            })
            imageUrl = uploadResponse.secure_url
        }

        const updatedProduct = await prisma.category.update({
            where: { id: id },
            data: {
                name: title,
                image: imageUrl,
                slug,
            },
        })

        return NextResponse.json(updatedProduct)
    } catch (err) {
        console.error("Error updating category:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
