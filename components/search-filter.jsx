"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { CATEGORIES, PRICE_RANGES } from "@/lib/constants"

export default function SearchFilter({ onFilter }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const handleFilter = () => {
    onFilter({ search, category, priceRange })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Prices</option>
            {PRICE_RANGES.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleFilter}
        className="mt-4 w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition font-medium"
      >
        Apply Filters
      </button>
    </div>
  )
}
