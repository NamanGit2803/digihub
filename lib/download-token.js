// Generate secure download tokens
export const generateDownloadToken = (userId, productId) => {
  const token = Buffer.from(`${userId}:${productId}:${Date.now()}`).toString("base64")
  return token
}

export const verifyDownloadToken = (token) => {
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [userId, productId, timestamp] = decoded.split(":")
    const tokenAge = Date.now() - Number.parseInt(timestamp)
    const tokenExpiry = 10 * 60 * 1000 // 10 minutes

    if (tokenAge > tokenExpiry) {
      return null
    }

    return { userId, productId }
  } catch {
    return null
  }
}
