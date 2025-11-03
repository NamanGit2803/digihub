"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import ProductCard from "@/components/product-card"
import SearchFilter from "@/components/search-filter"
import { ArrowRight } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'

const Home = () => {


  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    // Initialize with sample products
    const sampleProducts = [
      {
        id: "1",
        title: "React Component Library",
        description: "Beautiful, reusable React components for your projects",
        price: 29,
        category: "Templates",
        image: "/react-components.jpg",
        status: "active",
      },
      {
        id: "2",
        title: "Web Design Course",
        description: "Complete guide to modern web design principles",
        price: 49,
        category: "Courses",
        image: "/web-design.jpg",
        status: "active",
      },
      {
        id: "3",
        title: "Next.js Starter Kit",
        description: "Production-ready Next.js template with authentication",
        price: 39,
        category: "Templates",
        image: "/nextjs-starter.jpg",
        status: "active",
      },
      {
        id: "4",
        title: "UI Design E-book",
        description: "Master UI design with practical examples and case studies",
        price: 19,
        category: "E-books",
        image: "/abstract-ui-elements.png",
        status: "active",
      },
      {
        id: "5",
        title: "WordPress Plugin Bundle",
        description: "10 premium WordPress plugins for your website",
        price: 59,
        category: "Plugins",
        image: "/wordpress-logo.png",
        status: "active",
      },
      {
        id: "6",
        title: "Icon Pack Pro",
        description: "5000+ customizable SVG icons for your projects",
        price: 24,
        category: "Assets",
        image: "/assorted-icons.png",
        status: "active",
      },
    ]

    setProducts(sampleProducts)
    setFilteredProducts(sampleProducts)
  }, [])

  const handleFilter = ({ search, category, priceRange }) => {
    let filtered = products

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (priceRange) {
      const range = {
        "Under $10": [0, 10],
        "$10 - $50": [10, 50],
        "$50 - $100": [50, 100],
        "Over $100": [100, Number.POSITIVE_INFINITY],
      }[priceRange]
      if (range) {
        filtered = filtered.filter((p) => p.price >= range[0] && p.price <= range[1])
      }
    }

    setFilteredProducts(filtered)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Discover Premium Digital Products</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Access thousands of high-quality digital products including templates, courses, e-books, and more.
            </p>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <SearchFilter onFilter={handleFilter} />

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}

    </>
  )
}


export default observer(Home)
