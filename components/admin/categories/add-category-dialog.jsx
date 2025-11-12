"use client"

import { useState } from "react"
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
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"
import { Trash2, CheckCircle, Plus } from "lucide-react"


const AddCategoryDialog = () => {
    const { categoryStore } = useStore()
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    })
    const [dialogOpen, setdialogOpen] = useState(false)

    const [preview, setPreview] = useState("")

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

    // on submit 
    const handleSubmit = async () => {
        const { title, image } = formData
        if (title == '' || image == null) {
            toast.error('Please fill in all fields.')
            return
        }

        //  Convert file to base64
        const base64Image = await toBase64(image)

        const categoryData = {
            ...formData,
            image: base64Image, // send as base64 string
        }

        // fetch api 
        await categoryStore.addCategory(categoryData)

        if (!categoryStore.error) {
            toast(
                <div className="flex gap-2 items-center">
                    <CheckCircle className="text-green-600 w-4 h-4" />
                    <span>Category added successfully</span>
                </div>
            )

            setdialogOpen(false)
            setFormData({
                title: "",
                image: null,
            })
            setPreview("")
        } else {
            toast.error(categoryStore.error)
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto hover:cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Fill in details to add a new category.
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
                            placeholder="Enter category title"
                        />
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
                </div>

                <DialogFooter className="pt-4">
                    <Button variant="outline" onClick={() => {
                        setdialogOpen(false), setFormData({
                            title: "",
                            image: null,
                        })
                        setPreview("")
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={categoryStore.loading}>{categoryStore.loading ? "Adding Category..." : "Add Category"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default observer(AddCategoryDialog)
