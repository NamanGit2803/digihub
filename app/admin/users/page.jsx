"use client"

import { useState } from "react"
import { Ban, CheckCircle } from "lucide-react"

export default function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
      status: "active",
      joinDate: "2025-01-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543211",
      status: "active",
      joinDate: "2025-01-05",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      mobile: "9876543212",
      status: "active",
      joinDate: "2025-01-10",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      mobile: "9876543213",
      status: "banned",
      joinDate: "2025-01-15",
    },
  ])

  const toggleBan = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "banned" : "active" } : user,
      ),
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage user accounts</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Mobile</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mobile}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleBan(user.id)}
                      className={`p-2 rounded-lg transition ${
                        user.status === "active"
                          ? "hover:bg-destructive/10 text-destructive"
                          : "hover:bg-green-100 text-green-600"
                      }`}
                    >
                      {user.status === "active" ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
