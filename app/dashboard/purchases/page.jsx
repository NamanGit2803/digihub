"use client"

import { useState, useEffect } from "react"
import { Download, Eye } from "lucide-react"
import Link from "next/link"

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    // Mock purchases - in production, fetch from API
    setPurchases([
      {
        id: "1",
        productId: "1",
        title: "React Component Library",
        price: 29,
        purchaseDate: "2025-01-15",
        status: "completed",
      },
      {
        id: "2",
        productId: "2",
        title: "Web Design Course",
        price: 49,
        purchaseDate: "2025-01-10",
        status: "completed",
      },
      {
        id: "3",
        productId: "3",
        title: "Next.js Starter Kit",
        price: 39,
        purchaseDate: "2025-01-08",
        status: "completed",
      },
    ])
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
        <p className="text-muted-foreground">View all your purchased products</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Purchase Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="border-b border-border hover:bg-secondary/50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium">{purchase.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-primary font-semibold">${purchase.price}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${purchase.productId}`}
                        className="p-2 hover:bg-secondary rounded-lg transition"
                        title="View Product"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 hover:bg-secondary rounded-lg transition" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
