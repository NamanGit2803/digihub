import { updateOrder, createDownload } from "@/lib/db"
import { verifyPayment } from "@/lib/payment"
import { generateDownloadToken } from "@/lib/download-token"

export async function POST(request) {
  try {
    const { orderId, paymentId, signature } = await request.json()

    // Verify payment with gateway
    const verification = await verifyPayment(paymentId, orderId, signature)

    if (verification.success) {
      // Update order status
      const order = updateOrder(orderId, {
        status: "completed",
        payment_id: paymentId,
      })

      // Create download record
      const downloadToken = generateDownloadToken(order.user_id, order.product_id)
      createDownload({
        user_id: order.user_id,
        product_id: order.product_id,
        download_token: downloadToken,
      })

      return Response.json({
        success: true,
        message: "Payment verified successfully",
        downloadToken,
      })
    } else {
      updateOrder(orderId, { status: "failed" })
      return Response.json({ success: false, error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
