import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return Response.json({ error: "Invalid password" }, { status: 401 })
    }

    let token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const { password: _, ...userWithoutPassword } = user
    return Response.json({ user: userWithoutPassword, token: token })
  } catch (err) {
    console.error(err)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}
