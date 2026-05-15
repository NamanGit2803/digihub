"use client"

import Link from "next/link"
import { ShoppingCart, Eye } from "lucide-react"
import QrCodeGenerator from "../QrCodeGenerator"
import { observer } from "mobx-react-lite"
import { useStore } from '../../stores/StoreProvider'
import { toJS } from "mobx"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const ProductCard = ({ product }) => {

  const { userStore, orderStore } = useStore()
  const [purchased, setPurchased] = useState(false)

  useEffect(() => {

    if (userStore.user && orderStore.orders.length > 0) {
      const owns = orderStore.orders.some(order =>
        order.product_id === product.id &&
        order.download_allow &&
        order.status === "APPROVED"
      );
      if (owns) {
        setPurchased(true)
      } else {
        setPurchased(false)
      }
    }
  }, [userStore.user, orderStore.orders, product.id])


  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-48 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
        <img
          src={product.image || `/placeholder.svg?height=200&width=300&query=${product.title}`}
          alt={product.title}
          className="w-full h-full object-fill"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 ">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </Link>
          {purchased ? <Button
            className="hover:cursor-pointer"
            onClick={() => startDownload(download.id)}
          >
            Download
          </Button>
            : <QrCodeGenerator product={product} />}
        </div>
      </div>
    </div>
  )
}

export default observer(ProductCard)
