import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    //  Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    //  Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    //  Exclude password from response
    const { password: _, ...userWithoutPassword } = user

    //  Create response and attach cookie
    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    })

    //  Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,                  // secure against XSS
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,        // 7 days
      path: "/",
    })

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
