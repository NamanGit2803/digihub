"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"
import { Trash2, CheckCircle, Plus } from "lucide-react"


const AddProductDialog = () => {
    const { productStore, categoryStore } = useStore()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: null,
        file_path: "",
        status: "active",
    })
    const [dialogOpen, setdialogOpen] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        categoryStore.fetchCategories()
    }, [])


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, image: file })
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleRemoveFile = () => {
        setFormData({ ...formData, image: null })
        setPreview("")
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })

    // handle submit 
    const handleSubmit = async () => {
        const { title, description, price, category, image, file_path } = formData
        if (title == '' || description == '' || price == '' || category == '' || file_path == '' || image == null) {
            toast.error('Please fill in all fields.')
            return
        }

        //  Convert file to base64
        const base64Image = await toBase64(image)
        const productData = {
            ...formData,
            image: base64Image, // send as base64 string
        }

        // fetch api 
        await productStore.addProduct(productData)

        if (!productStore.error) {
            toast(
                <div className="flex gap-2 items-center">
                    <CheckCircle className="text-green-600 w-4 h-4" />
                    <span>Product added successfully</span>
                </div>
            )

            setdialogOpen(false)
            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                image: null,
                file_path: "",
                status: "active",
            })
            setPreview("")
        } else {
            toast.error(productStore.error)
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto hover:cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in details to add a new product to your catalog.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter product title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter product description"
                            rows={3}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="0.00"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(val) => setFormData({ ...formData, category: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryStore.categories?.map(cat => ( 
                                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Image Upload with Remove Option */}
                    <div>
                        <Label htmlFor="image">Product Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {preview && (
                            <div className="mt-3 flex items-center gap-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md border"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleRemoveFile}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* File Path */}
                    <div>
                        <Label htmlFor="file_path">File Path</Label>
                        <Input
                            id="file_path"
                            value={formData.file_path}
                            onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
                            placeholder="/uploads/products/file.pdf"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(val) => setFormData({ ...formData, status: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <Button variant="outline" onClick={() => {
                        setdialogOpen(false), setFormData({
                            title: "",
                            description: "",
                            price: "",
                            category: "",
                            image: null,
                            file_path: "",
                            status: "active",
                        })
                        setPreview("")
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={productStore.loading}>{productStore.loading ? "Adding Product..." : "Add Product"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default observer(AddProductDialog)
