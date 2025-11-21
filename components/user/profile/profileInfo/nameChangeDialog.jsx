'use client'

import React from 'react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Mail, Phone, User, Edit2, CircleCheckBig } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'

const NameChangeDialog = ({ editingField, setEditingField }) => {

    const { userStore } = useStore()
    const [name, setName] = useState(userStore.user?.name)

    const submit = async () => {
        await userStore.updateProfile({ name: name })
        toast(<div className='flex gap-2 items-center'><CircleCheckBig className='w-4 h-4' /><span>Profile updated successfully!</span></div>)
        setEditingField(null)
    }

    return (
        <Dialog open={editingField === "name"} onOpenChange={(open) => !open && setEditingField(null)}>
            <DialogTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => setEditingField("name")} className="h-8 w-8 p-0">
                    <Edit2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Name</DialogTitle>
                    <DialogDescription>Update your name below</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setEditingField(null)}>
                            Cancel
                        </Button>
                        <Button onClick={() => submit()}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default observer(NameChangeDialog)