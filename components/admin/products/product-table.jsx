"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Eye } from "lucide-react"
import DeleteConfirmDialog from "../deleteConfirmDialog"
import ProductDetails from "./productDetails"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'


const ProductTable = ({ searchTerm = "" }) => {
  const { productStore } = useStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [seletedProduct, setSeletedProduct] = useState({})
  const [editable, setEditable] = useState(false)

  const filtered = productStore.products?.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductDialog = (product, type) => {
    setSeletedProduct(product)
    setDialogOpen(true)
    type=='view' ? setEditable(false) : setEditable(true)
  }

  useEffect(() => {
    productStore.fetchProducts()
  }, [])
  

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
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
          {filtered?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(product.status)} variant="outline">
                  {product.status}
                </Badge>
              </TableCell>
              {/* action  */}
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={()=>{handleProductDialog(product, 'view')}} variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button onClick={()=>{handleProductDialog(product, 'edit')}} variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <DeleteConfirmDialog details={product.id} type={'Product'}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductDetails dialogOpen={dialogOpen} onOpenChange={setDialogOpen} product={seletedProduct} editable={editable}/>
    </>
  )
}

export default observer(ProductTable)
