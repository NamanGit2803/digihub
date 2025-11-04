"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

const mockProducts = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "MOUSE-001",
    category: "Electronics",
    price: 29.99,
    stock: 45,
    status: "active",
  },
  {
    id: "2",
    name: "USB-C Cable",
    sku: "USB-001",
    category: "Accessories",
    price: 12.99,
    stock: 120,
    status: "active",
  },
  {
    id: "3",
    name: "Keyboard Pro",
    sku: "KB-001",
    category: "Electronics",
    price: 89.99,
    stock: 0,
    status: "inactive",
  },
  {
    id: "4",
    name: "Monitor Stand",
    sku: "STAND-001",
    category: "Furniture",
    price: 39.99,
    stock: 22,
    status: "active",
  },
  {
    id: "5",
    name: "Desk Lamp",
    sku: "LAMP-001",
    category: "Lighting",
    price: 45.99,
    stock: 15,
    status: "discontinued",
  },
]

export function ProductTable({ searchTerm = "" }) {
  const [products, setProducts] = useState(mockProducts)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "discontinued":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Id</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(product.status)} variant="outline">
                {product.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
