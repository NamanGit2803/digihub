import Razorpay from "razorpay"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.fetch(orderId)

    return NextResponse.json({
      orderId: order.id,
      status: order.status, // "created" | "paid" | "attempted"
      amount: order.amount / 100,
      created_at: order.created_at,
    })
  } catch (err) {
    console.error("Razorpay order status error:", err)
    return NextResponse.json(
      { error: "Unable to fetch payment status" },
      { status: 500 }
    )
  }
}
