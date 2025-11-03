import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET missing");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    // ✅ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ✅ Parse request body
    const body = await req.json();
    const { name, mobile, currentPassword, newPassword } = body;

    if (!name && !mobile && !newPassword) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    // ✅ Get user
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData = {};

    // ✅ Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required" },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    // ✅ Handle other updates
    if (name) updateData.name = name;
    if (mobile) updateData.mobile = mobile;

    // ✅ Only now update once
    const updatedUser = await prisma.user.update({
      where: { email: decoded.email },
      data: updateData,
      select: { name: true, email: true, mobile: true },
    });

    return NextResponse.json({
      message: newPassword
        ? "Password and profile updated successfully"
        : "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
