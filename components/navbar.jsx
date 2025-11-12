"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from "../stores/StoreProvider"
import AuthModal from "./auth-modal"
import ProfileDropdown from "./user/profile-dropdown"

const Navbar = () => {
  const { userStore } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname() // 👈 get current route path

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Helper to check if a link is active
  const isActive = (path) => pathname === path

  // Styling for active vs inactive links
  const linkClass = (path) =>
    `transition font-medium ${
      isActive(path)
        ? "text-primary border-b-2 border-primary pb-1"
        : "text-foreground hover:text-primary"
    }`

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">DigitalHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/products" className={linkClass("/products")}>
              Products
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center">
            {isMounted && (
              userStore.token == null ? <AuthModal /> : <ProfileDropdown />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className={`${linkClass("/")} block px-4 py-2 rounded-lg`}>
              Home
            </Link>
            <Link href="/products" className={`${linkClass("/products")} block px-4 py-2 rounded-lg`}>
              Products
            </Link>
            <Link href="/about" className={`${linkClass("/about")} block px-4 py-2 rounded-lg`}>
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default observer(Navbar)
