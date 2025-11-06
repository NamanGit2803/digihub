import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
        // Fetch only users with role = 'user'
        const users = await prisma.user.findMany({
            where: { role: "user" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                mobile: true,
            },
            orderBy: { id: "desc" }, // optional: newest first
        })

        return NextResponse.json(users)
    } catch (err) {
        console.error("Error fetching users:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}




// ✅ DELETE — Delete user by ID (sent in body)
export async function DELETE(req) {
    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email: id } })
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Optional: prevent deleting admins
        if (existingUser.role === "admin") {
            return NextResponse.json({ error: "Cannot delete admin users" }, { status: 403 })
        }

        await prisma.user.delete({
            where: { email: id },
        })

        return NextResponse.json({ message: "User deleted successfully" })
    } catch (err) {
        console.error("Error deleting user:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
