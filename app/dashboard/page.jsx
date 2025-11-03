"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Download, TrendingUp, User } from "lucide-react"

export default function DashboardHome() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalPurchases: 0,
    totalDownloads: 0,
    totalSpent: 0,
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      // Mock stats - in production, fetch from API
      setStats({
        totalPurchases: 5,
        totalDownloads: 12,
        totalSpent: 156.5,
      })
    }
  }, [])

  if (!user) return null

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">Here's your account overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Purchases</p>
              <p className="text-3xl font-bold">{stats.totalPurchases}</p>
            </div>
            <ShoppingBag className="w-10 h-10 text-primary/20" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Downloads</p>
              <p className="text-3xl font-bold">{stats.totalDownloads}</p>
            </div>
            <Download className="w-10 h-10 text-primary/20" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Spent</p>
              <p className="text-3xl font-bold">${stats.totalSpent}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-primary/20" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Account Status</p>
              <p className="text-3xl font-bold">Active</p>
            </div>
            <User className="w-10 h-10 text-primary/20" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium">React Component Library</p>
              <p className="text-sm text-muted-foreground">Purchased 2 days ago</p>
            </div>
            <span className="text-primary font-semibold">$29.00</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium">Web Design Course</p>
              <p className="text-sm text-muted-foreground">Purchased 5 days ago</p>
            </div>
            <span className="text-primary font-semibold">$49.00</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Next.js Starter Kit</p>
              <p className="text-sm text-muted-foreground">Purchased 1 week ago</p>
            </div>
            <span className="text-primary font-semibold">$39.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
