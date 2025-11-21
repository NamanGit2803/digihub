"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '../stores/StoreProvider'
import { toJS } from "mobx"
import Hero from "../components/Hero"
import CategorySection from "../components/products/categorySection"

const Home = () => {

  const { publicProductsStore } = useStore()


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
