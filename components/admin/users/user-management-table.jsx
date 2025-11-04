"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Shield } from "lucide-react"

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", mobile: '6350250055', },
  { id: "2", name: "Jane Smith", email: "jane@example.com", mobile: '6350250054',},
  { id: "3", name: "Bob Johnson", email: "bob@example.com", mobile: '6350250053',},
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    mobile: '6350250058',
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    mobile: '6350250056',
  },
]

export function UserManagementTable({ searchTerm = "", roleFilter = "all" }) {
  const [users, setUsers] = useState(mockUsers)

  const filtered = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const getRoleIcon = (role) => (role === "admin" ? "Admin" : role.charAt(0).toUpperCase() + role.slice(1))

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobile}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
