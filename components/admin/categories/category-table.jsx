"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Eye } from "lucide-react"
import DeleteConfirmDialog from "../deleteConfirmDialog"
import UpdateCategoryDialog from "./update-category-dialog"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'


const CategoryTable = ({ searchTerm = "" }) => {
    const { categoryStore } = useStore()

    const filtered = categoryStore.categories?.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        categoryStore.fetchCategories()
    }, [])

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Category Id</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered?.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                {category.image ? (
                                    <div className="w-12 h-12 overflow-hidden rounded-md border">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                        N/A
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.slug}</TableCell>
                            {/* action  */}
                            <TableCell>
                                <div className="flex gap-2">
                                    <UpdateCategoryDialog category={category}/>
                                    <DeleteConfirmDialog details={category.id} type={'Category'} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </>
    )
}

export default observer(CategoryTable)
