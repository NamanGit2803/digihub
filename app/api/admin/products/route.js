import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import cloudinary from "@/lib/cloudinary"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

//  CREATE PRODUCT (POST)
export async function POST(req) {
  try {
    const body = await req.json()
    const { title, description, price, category, image, file_path, status } = body

    let imageUrl = image

    // Upload base64 image to Cloudinary
    if (typeof image === "string" && image.startsWith("data:image")) {
        
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      })
      imageUrl = uploadResponse.secure_url
      console.log("jij",imageUrl)
    }

    

    const customId = `prod_${nanoid(8)}`

    const newProduct = await prisma.product.create({
      data: {
        id: customId,
        title,
        description,
        price: price,
        category,
        image: imageUrl,
        file_path,
        status,
      },
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (err) {
    console.error("Error creating product:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ GET ALL PRODUCTS
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

// ✅ UPDATE PRODUCT (PUT)
export async function PUT(req) {
  try {
    const body = await req.json()
   
    const { id, title, description, price, category, image, file_path, status } = body

     console.log('body', id)
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const existingProduct = await prisma.product.findUnique({ where: { id: id } })
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    let imageUrl = image

    // Upload base64 image if changed
    if (typeof image === "string" && image.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      })
      imageUrl = uploadResponse.secure_url
    }

    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        title,
        description,
        price: price,
        category,
        image: imageUrl,
        file_path,
        status,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (err) {
    console.error("Error updating product:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ DELETE PRODUCT
export async function DELETE(req) {
  try {
    const { id } = await req.json(); 

    console.log('id', id)

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: id } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id: id } });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
