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

const MobileChangeDialog = ({ editingField, setEditingField }) => {

    const { userStore } = useStore()
    const [mobile, setMobile] = useState(userStore.user?.mobile)

    const submit = async () => {
        await userStore.updateProfile({ mobile: mobile })
        toast(<div className='flex gap-2 items-center'><CircleCheckBig className='w-4 h-4' /><span>Profile updated successfully!</span></div>)
        setEditingField(null)
    }

    return (
        <Dialog open={editingField === "phone"} onOpenChange={(open) => !open && setEditingField(null)}>
            <DialogTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => setEditingField("phone")} className="h-8 w-8 p-0">
                    <Edit2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Mobile</DialogTitle>
                    <DialogDescription>Update your mobile number below</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Mobile Number</Label>
                        <Input
                            id="phone"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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

export default observer(MobileChangeDialog)