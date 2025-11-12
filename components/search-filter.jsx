"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { CATEGORIES, PRICE_RANGES } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'
import { toJS } from "mobx"

const SearchFilter = ({ onFilter }) => {

  const { publicProductsStore } = useStore()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  //  Run filter whenever user types or selects anything
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onFilter({
        search,
        category: category === "all" ? "" : category,
        priceRange: priceRange === "all" ? "" : priceRange,
      })
    }, 300) // small debounce for smoother UX

    return () => clearTimeout(delayDebounce)
  }, [search, category, priceRange])

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 🔍 Search Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* 🏷️ Category Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {publicProductsStore.categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 💰 Price Range Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.label} value={range.label}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default observer(SearchFilter)
