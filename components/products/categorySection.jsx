"use client"

import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../stores/StoreProvider"
import Link from "next/link"
import Image from "next/image"

const CategorySection = () => {
    const { publicProductsStore } = useStore()

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/*  Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Browse by Category
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                        Explore products from your favorite collections — crafted to inspire and empower your next project.
                    </p>
                </div>

                {/*  Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {publicProductsStore.categories?.map((category) => (
                        <Link
                            href={`/products?category=${category.slug}`}
                            key={category.id}
                            className="group relative block overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                        >
                            {/*  Category Image */}
                            <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-56 bg-muted">
                                {category.image ? (
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-primary/10 to-accent/10 text-muted-foreground text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/*  Overlay Text */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                                <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow-md">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default observer(CategorySection)
