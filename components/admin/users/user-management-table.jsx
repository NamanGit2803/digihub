"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const UserManagementTable = ({ searchTerm = "" }) => {
  const { manageUsersStore } = useStore()
  const [selectedUser, setSelectedUser] = useState(null)
  const [open, setOpen] = useState(false) // for dialog open/close

  const filtered = manageUsersStore.allUsers?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  // 🗑️ Confirm Delete Handler
  const confirmDelete = async () => {
    if (!selectedUser) return
    await manageUsersStore.deleteUser(selectedUser.email)

    if (!manageUsersStore.error) {
      toast(
        <div className="flex gap-2 items-center">
          <CheckCircle className="text-green-600 w-4 h-4" />
          <span>User deleted successfully</span>
        </div>
      )
    } else {
      toast.error(manageUsersStore.error)
    }

    setOpen(false)
    setSelectedUser(null)
  }

  return (
    <>
      {/* ✅ Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser?.name}</span>? <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className='hover:cursor-pointer' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Table */}
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
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-red-600 hover:text-white"
                    onClick={() => {
                      setSelectedUser(user)
                      setOpen(true)
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default observer(UserManagementTable)
