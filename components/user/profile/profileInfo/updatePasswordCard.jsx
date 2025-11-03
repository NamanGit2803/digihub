'use client'

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff, MessageSquareWarning, CheckCircle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"

const UpdatePasswordCard = () => {

    const { userStore } = useStore()

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    })

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    })

    // reset all fields 
    const resetPasswordFields = () => {
        setPasswordData({ current: "", new: "", confirm: "" })
        setShowPassword({ current: false, new: false, confirm: false })
    }

    // handle change password 
    const handleChangePassword = async () => {
        if (passwordData.current == '' || passwordData.new == '' || passwordData.confirm == '') {
            toast.error("Please fill in all password fields.")
            return
        }

        if (passwordData.new != passwordData.confirm) {
            toast.error("New and confirm passwords do not match.")
            return
        }

        await userStore.updateProfile({
            currentPassword: passwordData.current,
            newPassword: passwordData.new,
        })

        if (userStore.error) {
            toast.error(userStore.error)
        } else {
            toast(
                <div className="flex gap-2 items-center">
                    <CheckCircle className="text-green-600 w-4 h-4" />
                    <span>
                        Password updated successfully!
                    </span>
                </div>
            )
            resetPasswordFields()
            setPasswordDialogOpen(false)
        }
    }

    const handleDialogChange = (open) => {
        setPasswordDialogOpen(open)
        if (!open) resetPasswordFields()
    }

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    return (
        <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                </CardTitle>
                <Dialog open={passwordDialogOpen} onOpenChange={handleDialogChange}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                            Change Password
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                Enter your current password and set a new one
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="current-password"
                                        type={showPassword.current ? "text" : "password"}
                                        value={passwordData.current}
                                        onChange={(e) =>
                                            setPasswordData((prev) => ({
                                                ...prev,
                                                current: e.target.value,
                                            }))
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShowPassword("current")}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        {showPassword.current ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="new-password"
                                        type={showPassword.new ? "text" : "password"}
                                        value={passwordData.new}
                                        onChange={(e) =>
                                            setPasswordData((prev) => ({
                                                ...prev,
                                                new: e.target.value,
                                            }))
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShowPassword("new")}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        {showPassword.new ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirm-password"
                                        type={showPassword.confirm ? "text" : "password"}
                                        value={passwordData.confirm}
                                        onChange={(e) =>
                                            setPasswordData((prev) => ({
                                                ...prev,
                                                confirm: e.target.value,
                                            }))
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShowPassword("confirm")}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        {showPassword.confirm ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 justify-end pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => { setPasswordDialogOpen(false), resetPasswordFields() }}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleChangePassword}>Change Password</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    For security, change your password regularly
                </p>
            </CardContent>
        </Card>
    )
}

export default observer(UpdatePasswordCard)
