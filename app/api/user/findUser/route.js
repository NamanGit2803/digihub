export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // 🔐 Verify token
    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error("JWT_SECRET not set")
      return NextResponse.json({ error: "Server config error" }, { status: 500 })
    }

    let decoded
    try {
      decoded = jwt.verify(token, secret)
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // 🧠 Fetch user by ID from DB
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: { name: true, email: true, mobile: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error in /api/me:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
