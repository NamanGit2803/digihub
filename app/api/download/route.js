import { verifyDownloadToken } from "@/lib/download-token"
import { getProductById } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const productId = searchParams.get("productId")

    // Verify token
    const tokenData = verifyDownloadToken(token)
    if (!tokenData) {
      return Response.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const product = getProductById(productId)
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    // In production, serve the actual file from secure storage
    return Response.json({
      success: true,
      downloadUrl: `/files/${product.id}/download`,
      fileName: product.title,
    })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
