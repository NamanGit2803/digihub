'use client'

import React from 'react'
import { useState } from 'react'
import SearchFilter from '@/components/products/search-filter'
import ProductCard from "@/components/products/product-card"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from "mobx"
import { Ban } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import ProductSkeleton from '@/components/products/Product-skeleton'

const ProductsPage = () => {

    const { publicProductsStore } = useStore()
    const [filteredProducts, setFilteredProducts] = useState([])
    const products = toJS(publicProductsStore.products) || []
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    // filter 
    const handleFilter = ({ search, category, priceRange }) => {
        // Get a reactive copy of the MobX store data
        let filtered = [...toJS(products)]

        const searchQuery = search?.toLowerCase().trim() || ""

        // 🏷️ CATEGORY FILTER
        if (category && category !== "all") {
            filtered = filtered.filter(
                (p) => p.category?.toLowerCase() === category.toLowerCase()
            )
        }

        // 🔍 SEARCH FILTER
        if (searchQuery) {
            filtered = filtered.filter(
                (p) =>
                    p.title?.toLowerCase().includes(searchQuery) ||
                    p.description?.toLowerCase().includes(searchQuery)
            )
        }
        setFilteredProducts(filtered)
    }


    return (
        <section>
            <SearchFilter onFilter={handleFilter} defaultCategory={selectedCategory} />

            <h1 className="max-w-7xl mx-auto text-2xl font-bold ml-6">
                {selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
            </h1>

            <section className="py-10 md:py-10 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/*  LOADING SKELETONS */}
                    {publicProductsStore.loading && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/*  PRODUCTS */}
                    {!publicProductsStore.loading && filteredProducts.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/*  EMPTY STATE */}
                    {!publicProductsStore.loading && filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-lg text-muted-foreground">
                                No products found. Try adjusting your filters.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
}

export default observer(ProductsPage)