import Razorpay from "razorpay"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { amount, userId, productId, productTitle } = await req.json()

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        //  Create Razorpay Order 
        const order = await new Promise((resolve, reject) => {
            razorpay.orders.create(
                {
                    amount: amount * 100,
                    currency: "INR",
                    receipt: `rcpt_${Date.now()}`,
                    payment_capture: 1,
                },
                (err, order) => {
                    if (err) reject(err)
                    else resolve(order)
                }
            )
        })

        //  Create QR Code linked to that Order 
        const res = await fetch("https://api.razorpay.com/v1/qr_codes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " +
                    Buffer.from(
                        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
                    ).toString("base64"),
            },
            body: JSON.stringify({
                type: "upi_qr",
                name: "DigitalHub",
                usage: "single_use",
                fixed_amount: true,
                payment_amount: amount * 100, // in paise
                description: `Payment for ${productTitle}`,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.description || "QR creation failed");
        }

        return NextResponse.json({
            qrId: data.id,
            upiLink: data.image_url, // image_url gives QR image
            upiPaymentAddress: data.receivers?.[0]?.account_number, // optional
            amount,
        });
    } catch (err) {
        console.error("QR creation error:", err)
        return NextResponse.json(
            { error: "Failed to create QR", details: err.message },
            { status: 500 }
        )
    }
}
