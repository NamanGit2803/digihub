"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import ProductCard from "@/components/product-card"
import SearchFilter from "@/components/search-filter"
import { ArrowRight, CheckCircle } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'
import { toJS } from "mobx"
import Hero from "../components/Hero"
import CategorySection from "../components/categorySection"


const Home = () => {

  const { publicProductsStore } = useStore()
  // const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const products = toJS(publicProductsStore.products) || []


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

    console.log("Filtered Products:", filtered) // ✅ Debugging
    setFilteredProducts(filtered)
  }


  return (
    <>
      {/* Hero Section */}
      <Hero/>

      {/* category section */}
      <CategorySection/>

      
    </>
  )
}


export default observer(Home)
