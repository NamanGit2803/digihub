"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import CategoryTable from "@/components/admin/categories/category-table"
import AddCategoryDialog from "@/components/admin/categories/add-category-dialog"

export default function CategoryPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Categories</h1>
                <p className="text-muted-foreground">Create and update product categories easily.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Categories Catalog</CardTitle>
                            <CardDescription>Add, edit, and organize categories effortlessly.</CardDescription>
                        </div>
                        <AddCategoryDialog />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <CategoryTable searchTerm={searchTerm} />
                </CardContent>
            </Card>


        </div>
    )
}
