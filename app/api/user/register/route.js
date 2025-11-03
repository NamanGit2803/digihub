import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, mobile } = body;

    
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    let token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobile,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser

    return Response.json({ user: userWithoutPassword, token: token }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
