"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Mail, Phone, User, Edit2, Lock } from "lucide-react"
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
import { useStore } from '../../../stores/StoreProvider'

import NameChangeDialog from "./profileInfo/nameChangeDialog"
import MobileChangeDialog from "./profileInfo/mobileChangeDialog"
import UpdatePasswordCard from "./profileInfo/updatePasswordCard"


const ProfileInfo = () => {

  const { userStore } = useStore()

  const [editingField, setEditingField] = useState(null)
  

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }


  

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* name  */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4" />
              Name
            </CardTitle>
            <NameChangeDialog editingField={editingField} setEditingField={setEditingField}/>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-foreground">{userStore.user?.name}</p>
          </CardContent>
        </Card>

        {/* email  */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{userStore.user?.email}</p>
            <Button size="sm" variant="outline" onClick={() => copyToClipboard(userStore.user.email)} className="gap-2">
              <Copy className="w-3 h-3" />
              Copy
            </Button>
          </CardContent>
        </Card>

        {/* mobile  */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Mobile
            </CardTitle>
            <MobileChangeDialog editingField={editingField} setEditingField={setEditingField}/>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{userStore.user?.mobile}</p>
            <Button size="sm" variant="outline" onClick={() => copyToClipboard(userStore.user.mobile)} className="gap-2">
              <Copy className="w-3 h-3" />
              Copy
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* change password  */}
      <UpdatePasswordCard/>
    </div>
  )
}


export default observer(ProfileInfo)
