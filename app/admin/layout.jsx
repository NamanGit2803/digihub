"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import  AdminSidebar  from '@/components/admin/admin-sidebar'
import { Header } from "@/components/admin/header"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // useEffect(() => {
  //   const userData = localStorage.getItem("user")
  //   if (!userData) {
  //     router.push("/login")
  //   } else {
  //     setUser(JSON.parse(userData))
  //   }
  // }, [router])

  // if (!user) return null

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} user={user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
