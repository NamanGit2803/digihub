'use client'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from 'sonner'


const ProductDetails = ({ dialogOpen, onOpenChange, product, editable }) => {
  const { productStore } = useStore()
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    imageFile: null,
    category: '',
    status: '',
    description: '',
    file_path: '',
  })

  //  Load product data
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        title: product.title || '',
        price: product.price || '',
        image: product.image || '',
        imageFile: product.image || '',
        category: product.category || '',
        status: product.status || 'inactive',
        description: product.description || '',
        file_path: product.file_path || '',
      })
    }
  }, [product, dialogOpen])

  //  Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  //  Handle status change
  const handleStatusChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  //  Handle image file change (preview + store)
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // preview
          imageFile: file, // actual file
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  //  Remove selected image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
      imageFile: null,
    }))
  }

  //  handle save changes
  const handleSave = async () => {
    const { title, description, price, category, imageFile, file_path } = formData
    if (title == '' || description == '' || price == '' || category == '' || file_path == '' || imageFile == null) {
      toast.error('Please fill in all fields.')
      return
    }


    await productStore.updateProduct(formData)

    if (!productStore.error) {
      toast(
        <div className="flex gap-2 items-center">
          <CheckCircle className="text-green-600 w-4 h-4" />
          <span>Product updated successfully</span>
        </div>
      )
      onOpenChange(false)
    } else {
      console.log(productStore.error)
      toast.error(productStore.error)
    }



  }

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
    <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg md:max-w-2xl lg:max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editable ? "Edit Product" : formData.title}
          </DialogTitle>
          <DialogDescription>Product ID: {formData.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title & Category */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Title</p>
              {editable ? (
                <Input name="title" value={formData.title} onChange={handleChange} />
              ) : (
                <p className="font-semibold">{formData.title}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              {editable ? (
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="Notes">Notes</SelectItem>
                      <SelectItem value="E-Books">E-Books</SelectItem>
                      <SelectItem value="Icons">Icons & Illustrations</SelectItem>
                      <SelectItem value="Courses">Courses</SelectItem>
                      <SelectItem value="Templates">Templates</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-semibold">{formData.category}</p>
              )}
            </div>

          </div>

          {/* Price & Status */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              {editable ? (
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
              ) : (
                <p className="font-semibold text-lg">₹{formData.price}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              {editable ? (
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getStatusColor(formData.status)} variant="outline">
                  {formData.status}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="pb-4 border-b">
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            {editable ? (
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            ) : (
              <p className="text-sm">{formData.description}</p>
            )}
          </div>

          {/* Image & File Path */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Image</p>
              {editable ? (
                <div className="flex flex-col gap-2">
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="mt-2"
                      >
                        Remove Image
                      </Button>
                    </div>
                  )}
                  {!formData.image && <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />}
                </div>
              ) : formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-32 h-32 object-cover rounded-md border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">No image available</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">File Path</p>
              {editable ? (
                <Input
                  name="file_path"
                  value={formData.file_path}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-sm font-semibold break-all">{formData.file_path}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" className='hover:cursor-pointer' onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {editable && (
            <Button onClick={handleSave} className='hover:cursor-pointer' disabled={productStore.loading}>
              {productStore.loading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default observer(ProductDetails)
