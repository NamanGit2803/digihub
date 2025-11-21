'use client'

import React from 'react'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toJS } from 'mobx'

const DeleteConfirmDialog = ({ details, type }) => {
    const { productStore, categoryStore } = useStore()
    const [loading, setLoading] = useState(false)

    // delete function 
    const handleDelete = async () => {
        if (type === 'Product') {
            await productStore.deleteProduct(details)

            if (!productStore.error) {
                toast(
                    <div className="flex gap-2 items-center">
                        <CheckCircle className="text-green-600 w-4 h-4" />
                        <span>Product deleted successfully</span>
                    </div>
                )
            } else {
                toast.error(productStore.error)
            }
        } else if (type === 'Category') {
            await categoryStore.deleteCategory(details)

            if (!categoryStore.error) {
                toast(
                    <div className="flex gap-2 items-center">
                        <CheckCircle className="text-green-600 w-4 h-4" />
                        <span>Category deleted successfully</span>
                    </div>
                )
            } else {
                toast.error(categoryStore.error)
            }
        }
    }

    useEffect(() => {
        setLoading(productStore.loading)
    }, [toJS(productStore.loading), toJS(categoryStore.loading)])


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className='hover:bg-red-600' size="sm">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {type}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-medium">{''}</span>? <br />
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" className='hover:cursor-pointer' onClick={() => handleDelete()}>
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default observer(DeleteConfirmDialog)