"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"
import { ShoppingCart, Download, Star, Check } from "lucide-react"

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // Fetch product details
    const products = [
      {
        id: "1",
        title: "React Component Library",
        description: "Beautiful, reusable React components for your projects",
        fullDescription:
          "A comprehensive collection of production-ready React components built with TypeScript and Tailwind CSS. Includes buttons, forms, modals, cards, and more. Perfect for speeding up your development process.",
        price: 29,
        category: "Templates",
        image: "/placeholder.svg?key=ycff5",
        rating: 4.8,
        reviews: 124,
        features: ["50+ Components", "TypeScript Support", "Tailwind CSS", "Responsive Design", "Dark Mode"],
        status: "active",
      },
      {
        id: "2",
        title: "Web Design Course",
        description: "Complete guide to modern web design principles",
        fullDescription:
          "Learn modern web design from scratch. This comprehensive course covers design principles, color theory, typography, layout, and user experience. Includes 20+ hours of video content and real-world projects.",
        price: 49,
        category: "Courses",
        image: "/placeholder.svg?key=4y7ld",
        rating: 4.9,
        reviews: 256,
        features: ["20+ Hours Video", "Real Projects", "Lifetime Access", "Certificate", "Community Support"],
        status: "active",
      },
    ]

    const found = products.find((p) => p.id === params.id)
    setProduct(found)

    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [params.id])

  const handleBuyNow = () => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      // Redirect to checkout
      window.location.href = `/checkout/${product.id}`
    }
  }

  if (!product) {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-96 flex items-center justify-center overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{product.fullDescription}</p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Actions */}
              <div className="border-t border-border pt-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">${product.price}</span>
                  <p className="text-muted-foreground text-sm mt-2">One-time payment, lifetime access</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition font-medium text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition font-medium">
                    <Download className="w-5 h-5" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
          window.location.href = `/checkout/${product.id}`
        }}
      />
    </>
  )
}
