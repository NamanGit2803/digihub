"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"

export default function Checkout({ params }) {
  const [product, setProduct] = useState(null)
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  useEffect(() => {
    const products = [
      {
        id: "1",
        title: "React Component Library",
        price: 29,
        image: "/placeholder.svg?key=ycff5",
      },
      {
        id: "2",
        title: "Web Design Course",
        price: 49,
        image: "/placeholder.svg?key=4y7ld",
      },
    ]

    const found = products.find((p) => p.id === params.id)
    setProduct(found)

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [params.id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem("user"))

    try {
      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: params.id,
          userId: user.id,
        }),
      })

      const orderData = await orderResponse.json()

      if (orderData.success) {
        // In production, open Razorpay/Paytm payment modal
        // For now, simulate successful payment
        const verifyResponse = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderData.orderId,
            paymentId: orderData.paymentData.paymentId,
            signature: "mock_signature",
          }),
        })

        const verifyData = await verifyResponse.json()

        if (verifyData.success) {
          alert("Payment successful! Your download link has been sent to your email.")
          window.location.href = "/dashboard"
        }
      }
    } catch (error) {
      alert("Payment failed: " + error.message)
    }
  }

  if (!product || !user) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/products/${product.id}`} className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Product
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                <div className="mb-6">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="font-semibold mb-2">{product.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{product.title}</p>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(product.price * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${(product.price * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>

                {/* Customer Info */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Customer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit}>
                  <h3 className="font-semibold mb-4">Payment Information</h3>

                  <div className="mb-4 p-4 bg-secondary/20 border border-secondary rounded-lg flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="text-sm">Your payment is secure and encrypted</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="4242 4242 4242 4242"
                        maxLength="19"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="4"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition font-medium text-lg"
                  >
                    Pay ${(product.price * 1.1).toFixed(2)}
                  </button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By completing this purchase, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
