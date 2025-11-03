"use client"

import Link from "next/link"
import { ShoppingCart, Eye } from "lucide-react"
import QrCodeGenerator from "./QrCodeGenerator"
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'

const ProductCard = ({ product }) => {

  const { userStore } = useStore()

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
        <img
          src={product.image || `/placeholder.svg?height=200&width=300&query=${product.title}`}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 ">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </Link>
          <QrCodeGenerator product={product}/>
        </div>
      </div>
    </div>
  )
}

export default observer(ProductCard)
