"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      window.location.href = "/login"
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </>
  )
}
