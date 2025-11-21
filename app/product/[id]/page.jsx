"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Check } from "lucide-react"
import Image from "next/image"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import QrCodeGenerator from "../../../components/QrCodeGenerator"

const ProductPage = () => {
    const { publicProductsStore } = useStore()
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const found = publicProductsStore.products.find((p) => p.id === params.id)
        if (found) setProduct(found)
    }, [params.id, publicProductsStore.products])

    const handleBuyNow = () => {
        // 👇 You can navigate to checkout or trigger payment logic
        router.push(`/checkout/${product.id}`)
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background">
                <div className="flex items-center justify-center h-96">
                    <p className="text-muted-foreground">Product not found!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        {/* Product Image */}
                        <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-96">
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="w-full h-full object-fill"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                                    {product.category}
                                </div>

                                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                                <p className="text-lg text-muted-foreground mb-8">{product.description}</p>
                            </div>

                            {/* Price + Buy Now */}
                            <div className="flex flex-col gap-4">
                                <div className="text-3xl font-bold text-primary">
                                    ₹{product.price}
                                </div>

                                <QrCodeGenerator product={product} />

                                <p className="text-sm text-muted-foreground text-center">
                                    Instant download after purchase
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mb-12">
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold mb-6">Product Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-primary" />
                                        What's Included
                                    </h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            Complete source files
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            Documentation and guides
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            Lifetime updates
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            Commercial license
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                                    <p className="text-muted-foreground">
                                        Compatible with all modern browsers and devices. No additional software required.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default observer(ProductPage)
