'use client'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, CheckCircle, Edit2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from 'sonner'


const UpdateCategoryDialog = ({ category, editable }) => {

    const { productStore, categoryStore } = useStore()
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        image: '',
        imageFile: null,
        slug: '',
    })
    const [dialogOpen, setdialogOpen] = useState(false)

    //  Load product data
    useEffect(() => {
        if(!dialogOpen) return
        if (category) {
            setFormData({
                id: category.id || '',
                title: category.name || '',
                image: category.image || '',
                imageFile: category.image || '',
                slug: category.slug || '',
            })
        }
    }, [dialogOpen])

    //  Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
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
        const { title, imageFile, slug } = formData
        if (title == '' || imageFile == null || slug == '') {
            toast.error('Please fill in all fields.')
            return
        }


        await categoryStore.updateCategory(formData)

        if (!category.error) {
            toast(
                <div className="flex gap-2 items-center">
                    <CheckCircle className="text-green-600 w-4 h-4" />
                    <span>Product updated successfully</span>
                </div>
            )
            setdialogOpen(false)
        } else {
            toast.error(categoryStore.error)
        }
    }


    return (
        <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {"Edit Product"}
                    </DialogTitle>
                    <DialogDescription>Category ID: {formData.id}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Title & Category */}

                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Title</p>
                        <Input name="title" value={formData.title} onChange={handleChange} />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Slug</p>
                        <Input name="slug" value={formData.slug} onChange={handleChange} />
                    </div>


                    {/* Image & File Path */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Image</p>

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

                        </div>

                    </div>
                </div>

                {/* Footer Buttons */}
                <DialogFooter className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" className='hover:cursor-pointer' onClick={() => {
                        setdialogOpen(false), setFormData({
                            id: '',
                            title: '',
                            image: '',
                            imageFile: null,
                            slug: '',
                        })
                    }}>
                        Close
                    </Button>

                    <Button onClick={handleSave} className='hover:cursor-pointer' disabled={categoryStore.loading}>
                        {categoryStore.loading ? 'Saving Changes...' : 'Save Changes'}
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default observer(UpdateCategoryDialog)
