"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Lock, Mail } from "lucide-react"

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock admin login
    if (formData.email === "admin@example.com" && formData.password === "admin123") {
      localStorage.setItem("adminUser", JSON.stringify({ email: formData.email, role: "admin" }))
      window.location.href = "/admin"
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
          <p className="text-muted-foreground text-center mb-8">Access the admin dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Demo credentials: admin@example.com / admin123
          </p>
        </div>
      </div>
    </>
  )
}
